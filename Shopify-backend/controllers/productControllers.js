const {v4} = require('uuid');
const mssql = require ('mssql');
const { sqlConfig } = require('../config/config');
const { createProductsTable } = require('../Database/Tables/createTables');
// const { hereIsYourNewProject } = require('../EmailService/newUser');

const createNewProduct = async (req, res) => {
  try {
    createProductsTable()
    const id = v4();
    // const currentTime = new Date();
    const { name, description, price, category, image, num_items } = req.body;
    const pool = await mssql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("name", mssql.VarChar, name)
      .input("description", mssql.Text, description)
      .input("price", mssql.Decimal(10, 2), price) 
      .input("category", mssql.VarChar, category)
      .input("image", mssql.VarChar, image)
      .input("num_items", mssql.Int, num_items)
      .execute("createProductProc");
   console.log(result);
    if (result.rowsAffected[0] === 1) {
      return res.json({
        message: "Product created successfully",
      });
    } else {
      return res.json({ message: "Product creation failed" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};





//view one product controller
const viewOneProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID

    const pool = await mssql.connect(sqlConfig);

    // Fetch product by its ID from the products table
    const product = (
      await pool
        .request()
        .input("id", id)
        .execute("fetchOneProductProc")
    ).recordset[0];

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json({
      product,
    });
  } catch (error) {
    return res.json({ error });
  }
};



//view all product controller
const viewAllProducts = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const allProducts = (await pool.request().execute('fetchAllProductsProc'))
      .recordset;

    res.json({ products: allProducts });
  } catch (error) {
    return res.json({ error });
  }
};


//update product controller
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image, num_items } = req.body;

    const pool = await mssql.connect(sqlConfig);
    const currentTime = new Date();
    const result = await pool
      .request()
      .input("id", mssql.VarChar, id)  // Change to mssql.VarChar
      .input("name", mssql.VarChar, name)
      .input("description", mssql.VarChar, description)
      .input("price", mssql.Decimal, price)
      .input("category", mssql.VarChar, category)
      .input("image", mssql.VarChar, image)
      .input("num_items", mssql.Int, num_items)
      .execute("updateProductProc");

    console.log(result);

    if (result.rowsAffected[0] === 1) {
      res.json({
        message: "Product updated successfully",
      });
    } else {
      res.json({
        message: "Product not found or update failed",
      });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};



const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    // Check if the product is referenced in the cartItemsTable
    const cartItemCheck = await pool
      .request()
      .input("product_id", id)
      .execute("checkProductInCartProc");

    if (cartItemCheck.recordset.length > 0) {
      return res.json({
        message: "Product cannot be deleted as it is added to a cart.",
      });
    }

    // If not referenced, proceed to delete the product
    const result = await pool
      .request()
      .input("id", id)
      .execute("deleteProductProc");

    if (result.rowsAffected == 1) {
      res.json({
        message: "Product deleted successfully",
      });
    } else {
      res.json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.json({ error });
  }
};






module.exports = {
  createNewProduct,
  viewOneProduct,
  viewAllProducts,
  updateProduct,
  deleteProduct
};