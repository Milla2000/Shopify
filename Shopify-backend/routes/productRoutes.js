const {Router} = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { viewAllProducts, viewOneProduct, updateProduct, deleteProduct, createNewProduct } = require('../controllers/productControllers');

shopifyRouter = Router();

shopifyRouter.post('/', verifyToken, createNewProduct);
shopifyRouter.get('/', viewAllProducts);
shopifyRouter.get('/:id', viewOneProduct);
shopifyRouter.put('/:id', verifyToken, updateProduct);
shopifyRouter.delete('/:id', verifyToken, deleteProduct);

module.exports = {
    shopifyRouter
}
