const ProductCategoryModel = require('../../models/ProductCategoryModel');

class ProductCategorySpecification {
    async IsProductCategoryCodeUnique(productCategoryCode) {
        let numberOfProductCategoryRecords = await ProductCategoryModel.countDocuments({"code": productCategoryCode});
        return numberOfProductCategoryRecords == 0;
    }
}

module.exports = new  ProductCategorySpecification();