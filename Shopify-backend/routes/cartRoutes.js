const { Router } = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { getCartItems, addToCartAndCalculateTotal } = require('../controllers/cartControllers');

// app.use(cors());

cartRouter = Router();

cartRouter.post('/add-to-cart', verifyToken, addToCartAndCalculateTotal);
cartRouter.get('/cart-items', getCartItems);



module.exports = {
    cartRouter
}