const ProductModel = require("../models/ProductModel");

class ProductController {
    async GetAllRecords(request, response) {
        await ProductModel.find().sort('code')
            .then(successResponse => {
                return response.status(200).json(successResponse);
            })
            .catch(errorResponse => {
                return response.status(500).json(errorResponse);
            });
    }
}

module.exports = new ProductController();