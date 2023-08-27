const mssql = require("mssql");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { sqlConfig } = require("../config/config");
// const { registerSchema, loginSchema } = require("../validators/validators");
const dotenv = require("dotenv");
const { Console } = require("console");
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
        const productCheck = await pool.request()
            .input("product_id", mssql.VarChar, product_id)
            .query("SELECT id FROM productsTable WHERE id = @product_id");

        if (productCheck.recordset.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if a cart exists for the user
        const existingCart = await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .query("SELECT id FROM cartsTable WHERE user_id = @user_id");

        let cart_id = null;
       

        if (existingCart.recordset.length === 0) {
            // Create a new cart if it doesn't exist
            cart_id = v4(); 
            console.log(cart_id);// Generate a new cart_id
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
};




const getCartItems = async (req, res) => {
    try {
        // const userId = req.user.id; // Assuming you have user information in req.user
        const { userId } = req.body;
        console.log(userId);
        const pool = await mssql.connect(sqlConfig);
       
        const cartItems = await pool
            .request()
            .input("user_id", mssql.VarChar, userId)
            .execute("fetchCartItemsProc"); // stored procedure for fetching cart items

        res.json({
            cartItems: cartItems.recordset
        });
        console.log(cartItems.recordset);
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
        // console.log(cart_id);
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
        console.log(item_count);
        if (item_count === 0) {
            return res.status(400).json("You have no products in your cart, Kindly add products to your cart to make a purchase");
        }

        // Fetch the product name from the cartItemsTable
        const productNameResult = await pool.request()
            .input("cart_id", mssql.VarChar, cart_id)
            .query("SELECT TOP 1 product_name FROM cartItemsTable WHERE cart_id = @cart_id");

        const product_name = productNameResult.recordset[0].product_name;
        console.log(product_name);

        // Update num_items in productsTable and remove items from cartItemsTable
        await pool.request()
            .input("cart_id", mssql.VarChar, cart_id)
            .execute("checkoutProc"); // Call a stored procedure to handle these operations

        
        // Insert order details into the ordersTable
        await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .input("product_name", mssql.VarChar, product_name)
            .input("total_price", mssql.Decimal, total_price)
            .execute("insertOrderProc"); // Call a stored procedure to insert into ordersTable

        return res.status(200).json({
            message: "Checkout completed successfully",
            total_price: total_price
        });
    } catch (error) {
        return res.status(500).json({ error: error.message   });
    }
};









module.exports = {
    addToCart,
    getCartItems,
    checkout
};
