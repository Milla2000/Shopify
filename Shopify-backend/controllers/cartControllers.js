const mssql = require("mssql");
const { v4 } = require("uuid");
const { sqlConfig } = require("../config/config");
const dotenv = require("dotenv");
dotenv.config();


const addToCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        const pool = await mssql.connect(sqlConfig);

        // Check if the user exists
        const userCheck = await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .query("SELECT id FROM usersTable WHERE id = @user_id");

        if (userCheck.recordset.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the product exists
        // const productCheck = await pool.request()
        //     .input("product_id", mssql.VarChar, product_id)
        //     .query("SELECT id FROM productsTable WHERE id = @product_id");

        // if (productCheck.recordset.length === 0) {
        //     return res.status(404).json({ error: "Product not found" });
        // }

        // Check if a cart exists for the user
        const existingCart = await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .query("SELECT id FROM cartsTable WHERE user_id = @user_id");

        let cart_id = null;

        if (existingCart.recordset.length === 0) {
            // Create a new cart if it doesn't exist
            cart_id = v4(); 
            
            await pool.request()
                .input("cart_id", mssql.VarChar, cart_id)
                .input("user_id", mssql.VarChar, user_id)
                .execute("createCartProc"); // Create a new cartsTable using a stored procedure
        } else {
            cart_id = existingCart.recordset[0].id;
        }

        // Fetch product details using stored procedure
        const product = await pool.request()
            .input("id", mssql.VarChar, product_id)
            .execute("fetchOneProductProc");

        if (!product || product.recordset.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const { name, price, num_items } = product.recordset[0];

        if (num_items <= 0) {
            return res.status(400).json({ error: "Product is out of stock" });
        }

        // Call stored procedure to add product to cart and calculate total price
        const result = await pool.request()
            .input("id", mssql.VarChar, v4()) // Do not use v4() here
            .input("cart_id", mssql.VarChar, cart_id)
            .input("product_id", mssql.VarChar, product_id)
            .input("product_name", mssql.VarChar, name)
            .input("price", mssql.Decimal, price)
            .execute("addProductsToCartProc");

        const total_price = result.recordset[0].total_price;

        return res.status(200).json({
            message: "Product added to cart successfully",
            total_price: total_price
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}





const getCartItems = async (req, res) => {
    try {
        
        const userId = req.params.userId; 
        
        const pool = await mssql.connect(sqlConfig);
       
        const cartItems = await pool
            .request()
            .input("user_id", mssql.VarChar, userId)
            .execute("fetchCartItemsProc"); // stored procedure for fetching cart items

        res.json({
            cartItems: cartItems.recordset
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const checkout = async (req, res) => {
    try {
        const { user_id } = req.body;

        const pool = await mssql.connect(sqlConfig);

        // Check if a cart exists for the user
        const cartCheck = await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .query("SELECT id FROM cartsTable WHERE user_id = @user_id");

        if (cartCheck.recordset.length === 0) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const cart_id = cartCheck.recordset[0].id;
       
        // Calculate total price of items in the user's cart
        const totalPriceResult = await pool.request()
            .input("cart_id", mssql.VarChar, cart_id)
            .query("SELECT SUM(price) AS total_price FROM cartItemsTable WHERE cart_id = @cart_id");

        const total_price = totalPriceResult.recordset[0].total_price;

        // Check if there are items in the cart
        const cartItemsCheck = await pool.request()
            .input("cart_id", mssql.VarChar, cart_id)
            .query("SELECT COUNT(*) AS item_count FROM cartItemsTable WHERE cart_id = @cart_id");

        const item_count = cartItemsCheck.recordset[0].item_count;
        
        if (item_count === 0) {
            return res.status(400).json("You have no products in your cart, Kindly add products to your cart to make a purchase");
        }

        // Fetch the product name from the cartItemsTable
        const productNameResult = await pool.request()
            .input("cart_id", mssql.VarChar, cart_id)
            .query("SELECT TOP 1 product_name FROM cartItemsTable WHERE cart_id = @cart_id");

        const product_name = productNameResult.recordset[0].product_name;
        

        // Update num_items in productsTable and remove items from cartItemsTable
        await pool.request()
            .input("cart_id", mssql.VarChar, cart_id)
            .execute("checkoutProc"); 

        
        // Insert order details into the ordersTable
        await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .input("product_name", mssql.VarChar, product_name)
            .input("total_price", mssql.Decimal, total_price)
            .execute("insertOrderProc"); 

        return res.status(200).json({
            message: "Checkout completed successfully",
            total_price: total_price
        });
    } catch (error) {
        return res.status(500).json({ error: error.message   });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        const pool = await mssql.connect(sqlConfig);

        // Check if the product is in the user's cart
        const cartItem = await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .input("product_id", mssql.VarChar, product_id)
            .query("SELECT id FROM cartItemsTable WHERE cart_id IN (SELECT id FROM cartsTable WHERE user_id = @user_id) AND product_id = @product_id");

        if (cartItem.recordset.length === 0) {
            return res.status(404).json({ error: "Product not found in user's cart" });
        }
        // Call stored procedure to remove product from cart and update num_items
        await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .input("product_id", mssql.VarChar, product_id)
            .execute("removeProductFromCartProc");

        // Increase num_items for the removed product
        await pool.request()
            .input("product_id", mssql.VarChar, product_id)
            .execute("increaseNumItemsProc");

        return res.status(200).json({
            message: "Product removed from cart successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}










module.exports = {
    addToCart,
    getCartItems,
    checkout,
    removeFromCart
};
