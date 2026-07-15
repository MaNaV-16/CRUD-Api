const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller.js');
const upload = require('../middlewares/upload.middleware.js');

router.post('/', upload.single('image'), ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.put('/:id', upload.single('image'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
