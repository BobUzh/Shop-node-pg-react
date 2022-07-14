const { Product } = require('../models/models');

class ProductController {
    async getAll(req, res) {
        const products = await Product.findAll({where: {category_id: '1'}})
        res.json(products);
    }
}

module.exports = new ProductController();