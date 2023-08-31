const mssql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { sqlConfig } = require("../config/config");
const { registerSchema, loginSchema } = require("../validators/validators");
const { createUsersTable } = require('../Database/Tables/createTables');
const dotenv = require("dotenv");
dotenv.config();



const registerUser = async (req, res) => {
  try {

    // createUsersTable()
    const id = v4();

    const { username, email, password, phone_number } = req.body;

    if (!username || !email || !password || !phone_number) {
      return res.status(400).json({
        error: "Please input all values",
      });
    }
    
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(422).json(error.details);
    }

    const pool = await mssql.connect(sqlConfig);

    const hashedPwd = await bcrypt.hash(password, 5);

    const result = await pool
      .request()
      .input("id", id)
      .input("username", mssql.VarChar, username)
      .input("email", mssql.VarChar, email)
      .input("password", mssql.VarChar, hashedPwd)
      .input("phone_number", mssql.Int, phone_number)
      .execute("registerUserProc");

    if (result.rowsAffected[0] == 1) {
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      return res.status(400).json({ message: "Registration failed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);
    if (!email || !password) {
      return res.status(400).json({
        error: "Please input all values",
      });
    }

    if (error) {
      return res.status(422).json(error.details);
    }

    const pool = await mssql.connect(sqlConfig);


    const user = (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .execute("userLoginProc")
    ).recordset[0];

    if (!user) {
      return res.status(404).json({ message: "Email does not exist in the system, Please use a valid email address" });
    }
    
    // Check if the account is deactivated (soft deleted)
    // if (user.deleted_at !== null) {
    //   return res.status(403).json({ message: "Account is deactivated" });
    // }
 
    const comparePwd = await bcrypt.compare(password, user.password);

    if (!comparePwd) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const {  id ,  role, ...payload } = user;
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "36000s" }); 
    let message = "Logged in";

    if (user.role === "admin") {
      message = "Admin logged in";
    }

    return res.status(200).json({ id , role,  message,  token });

  } catch (error) {
    if (error.message.includes("duplicate key value")) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
};

const checkUser = async (req, res) => {
  if (req.info) {
    res.json({
      info: req.info
      // name:req.info.e_name,
      // email: req.info.email,
      // role: req.info.role
    })
  }
}


module.exports = {
  registerUser,
  userLogin,
  checkUser
};
