const Product = require('../models/Product'); 

class ProductService {
    async addProduct(data) { 
        return await Product.create(data); 
    }
    async getAllProducts() { 
        return await Product.find(); 
    }
    async updateProduct(id, data) { 
        return await Product.findByIdAndUpdate(id, data, { new: true }); 
    }
    async deleteProduct(id) { 
        return await Product.findByIdAndDelete(id); 
    }
}

module.exports = new ProductService();