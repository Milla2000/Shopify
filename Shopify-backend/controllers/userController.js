const mssql = require ('mssql');
const { sqlConfig } = require('../config/config');
// const { projectCompleteNotifier } = require('../EmailService/newUser');


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

        try {
            const result = await pool.request()
                .input('id', mssql.VarChar, id)
                .execute('deleteUserProc');

            if (result.rowsAffected[0] === 1) {
                return res.status(200).json({ message: 'User deleted successfully' });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            // Check if the error is due to the foreign key constraint
            if (error.message.includes('The DELETE statement conflicted with the REFERENCE constraint')) {
                return res.status(400).json({ message: 'User cannot be deleted because they have products in their cart' });
            } else {
                return res.status(500).json({ error: error.message });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// soft delete for users
const softDeleteUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID to be soft deleted

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .execute('softDeleteUserProc');

        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'User soft deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID to be updated
        const {  username, email, phone_number,  } = req.body;

        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('phone_number', mssql.VarChar, phone_number)
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

const viewCartItemsForAdmin = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .execute('viewCartItemsForAdminProc');

        const cartItems = result.recordset;
        if (cartItems.length > 0) {
            return res.status(200).json(cartItems);
        } else {
            return res.status(404).json({ message: 'No cart items found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



module.exports = {
    returnUsers,
    deleteUser,
    softDeleteUser,
    updateUser,
    viewCartItemsForAdmin
}