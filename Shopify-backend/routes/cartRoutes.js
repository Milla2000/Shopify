const { Router } = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { getCartItems, addToCart, checkout } = require('../controllers/cartControllers');

// app.use(cors());

cartRouter = Router();
cartRouter.post('/checkout', verifyToken, checkout);
cartRouter.post('/add-to-cart', verifyToken, addToCart);
cartRouter.get('/cart-items/:userId', verifyToken, getCartItems);




module.exports = {
    cartRouter
}