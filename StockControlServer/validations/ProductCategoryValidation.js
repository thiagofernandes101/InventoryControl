const productCategorySpecification = require('./specifications/ProductCategorySpecification');

class ProductCategoryValidation {
    async IsProductCategoryValidToInsert(request, response, next) {
        let productCategoryModel = request.body;
        let isProductCategoryCodeUnique = await productCategorySpecification.IsProductCategoryCodeUnique(productCategoryModel.code);

        if (!isProductCategoryCodeUnique) {
            return response.status(400).json({ error: 'Já existe uma categoria cadastrada com o número de código informado' });
        }

        return next();
    }

    async IsProductCategoryValidToUpdate(request, response, next) {
        let productCategoryModel = request.body;
        let isProductCategoryCodeUnique = await productCategorySpecification.IsProductCategoryCodeUnique(productCategoryModel.code);

        if (isProductCategoryCodeUnique) {
            return response.status(400).json({ error: 'Não há uma categoria de produto cadastrada' });
        }

        return next();
    }
}


module.exports = new ProductCategoryValidation();