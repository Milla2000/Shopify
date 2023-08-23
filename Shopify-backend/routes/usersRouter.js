const { Router } = require('express');
const { registerUser, userLogin, checkUser } = require('../controllers/authControllers');

<<<<<<< HEAD
const { returnUsers, updateUser, deleteUser, softDeleteUser, viewCartItemsForAdmin } = require('../controllers/userController');
=======
const { returnUsers, updateUser, deleteUser, softDeleteUser } = require('../controllers/userController');
>>>>>>> d5675689c1d263c0192ec993e04daadc75c6980a
const { verifyToken } = require('../middleware/verifyToken');
const usersRouter = Router()

//this are auth routes for users
usersRouter.post('/register', registerUser)
usersRouter.post('/login', userLogin)


<<<<<<< HEAD
usersRouter.put('/:id', verifyToken, updateUser)
usersRouter.delete('/permanentdelete/:id', verifyToken, deleteUser)
usersRouter.delete('/softdelete/:id', verifyToken, softDeleteUser) 
usersRouter.get('/check', verifyToken, checkUser)
usersRouter.get('/allusers', verifyToken, returnUsers)
usersRouter.get('/allcartitems', verifyToken, viewCartItemsForAdmin)


=======
usersRouter.put('/:id', updateUser)
usersRouter.delete('/permanentdelete/:id', deleteUser)
usersRouter.delete('/softdelete/:id', softDeleteUser) 
usersRouter.get('/check', verifyToken, checkUser)
usersRouter.get('/allusers', verifyToken, returnUsers)
>>>>>>> d5675689c1d263c0192ec993e04daadc75c6980a

module.exports = {
    usersRouter
}
