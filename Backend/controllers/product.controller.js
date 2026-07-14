const productService = require('../services/product.service.js');

class ProductController {
    async createProduct(req, res) {
        try {
            const { name, price, description } = req.body;
            if (!name || !price) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Name and Price are required!' 
                });
            }

            const product = await productService.addProduct({ name, price, description });
            res.status(201).json({ 
                success: true, 
                message: 'Product created successfully',
                data: product 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async getProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json({ 
                success: true, 
                count: products.length, 
                data: products 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await productService.updateProduct(id, req.body);
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Product not found!' 
                });
            }

            res.status(200).json({ 
                success: true, 
                message: 'Product updated successfully',
                data: product 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await productService.deleteProduct(id);
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Product not found!' 
                });
            }

            res.status(200).json({ 
                success: true, 
                message: 'Product deleted successfully' 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new ProductController();