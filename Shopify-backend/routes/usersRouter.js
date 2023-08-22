const { Router } = require('express');
const { registerUser, userLogin, checkUser } = require('../controllers/authControllers');

const { returnUsers, updateUser, deleteUser, softDeleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');
const usersRouter = Router()

//this are auth routes for users
usersRouter.post('/register', registerUser)
usersRouter.post('/login', userLogin)


usersRouter.put('/:id', updateUser)
usersRouter.delete('/permanentdelete/:id', deleteUser)
usersRouter.delete('/softdelete/:id', softDeleteUser) 
usersRouter.get('/check', verifyToken, checkUser)
usersRouter.get('/allusers', verifyToken, returnUsers)

module.exports = {
    usersRouter
}
