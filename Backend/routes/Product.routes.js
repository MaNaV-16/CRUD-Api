const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller.js');

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;