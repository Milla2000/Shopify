const mssql = require ('mssql');
const { sqlConfig } = require('../config/config');
const { projectCompleteNotifier } = require('../EmailService/newUser');


const returnUsers = async(req,res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allUsers = (await pool.request().execute('fetchAllUsersProc')).recordset
        
        res.json({users: allUsers})
    } catch (error) {
        return res.json({Error: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID to be deleted

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('deleteUserProc');

        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID to be updated
        const { full_name, email, phone_number, username } = req.body;

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('full_name', mssql.VarChar, full_name)
            .input('email', mssql.VarChar, email)
            .input('phone_number', mssql.VarChar, phone_number)
            .input('username', mssql.VarChar, username)
            .execute('updateUserProc');

        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'User details updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    returnUsers,
    deleteUser,
    updateUser
}