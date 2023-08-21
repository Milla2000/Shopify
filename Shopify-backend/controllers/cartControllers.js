const mssql = require("mssql");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { sqlConfig } = require("../config/config");
// const { registerSchema, loginSchema } = require("../validators/validators");
const dotenv = require("dotenv");
dotenv.config();


const addToCartAndCalculateTotal = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        const pool = await mssql.connect(sqlConfig);

        // Check if a cart exists for the user
        const existingCart = await pool.request()
            .input("user_id", mssql.VarChar, user_id)
            .query("SELECT id FROM cartsTable WHERE user_id = @user_id");

        let cart_id = null;

        if (existingCart.recordset.length === 0) {
            // Create a new cart if it doesn't exist
            cart_id = v4(); // Generate a new cart_id
            await pool.request()
                .input("cart_id", mssql.VarChar, cart_id)
                .input("user_id", mssql.VarChar, user_id)
                .execute("createNewCartProc"); // Create a new cart using a stored procedure
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
            .input("id", mssql.VarChar, v4()) // Use a new id for each insertion
            .input("user_id", mssql.VarChar, cart_id)
            .input("product_id", mssql.VarChar, product_id)
            .input("product_name", mssql.VarChar, name)
            .input("price", mssql.Decimal, price)
            .execute("addProductToCartAndCalculateTotalProc");

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
        const userId = req.user.id; // Assuming you have user information in req.user
        // console.log(userId);
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

module.exports = {
    addToCartAndCalculateTotal,
    getCartItems
};
