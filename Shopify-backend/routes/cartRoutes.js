const { Router } = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { getCartItems, addToCart, checkout, removeFromCart } = require('../controllers/cartControllers');

// app.use(cors());

cartRouter = Router();
cartRouter.post('/checkout', verifyToken, checkout);
cartRouter.post('/add-to-cart', verifyToken, addToCart);
cartRouter.post('/removeFromCart', verifyToken, removeFromCart);

cartRouter.get('/cart-items/:userId', verifyToken, getCartItems);




module.exports = {
    cartRouter
}