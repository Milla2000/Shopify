const { Router } = require('express');
const { registerUser, userLogin, checkUser } = require('../controllers/authControllers');

const { returnUsers, updateUser, deleteUser, softDeleteUser, viewCartItemsForAdmin } = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');
const usersRouter = Router()

//this are auth routes for users
usersRouter.post('/register', registerUser)
usersRouter.post('/login', userLogin)


usersRouter.put('/:id', verifyToken, updateUser)
usersRouter.delete('/permanentdelete/:id', verifyToken, deleteUser)
usersRouter.delete('/softdelete/:id', verifyToken, softDeleteUser) 
usersRouter.get('/check', verifyToken, checkUser)
usersRouter.get('/allusers', verifyToken, returnUsers)
usersRouter.get('/allcartitems', verifyToken, viewCartItemsForAdmin)



module.exports = {
    usersRouter
}
