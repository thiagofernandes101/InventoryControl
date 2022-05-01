const ProductCategoryModel = require('../models/ProductCategoryModel');

class ProductCategoryController {
    async Create(request, response) {
        console.log("Chamada do método de adição de uma nova categoria");

        const productCategory = new ProductCategoryModel(request.body);

        console.log("Objeto a ser salvo");
        console.log(productCategory);
        
        await productCategory.save()
        .then(successResponse => {
            return response.status(200).json(successResponse);
        })
        .catch(errorResponse => {
            return response.status(500).json(errorResponse);
        })
    }

    async GetById(request, response) {
        let id = request.params.id;
        let productCategory = await ProductCategoryModel.findById(id);
    }

    async Test(request, response) {
        console.log("Chamada do método de teste pela aplicação mobile");
        return response.status(200).json('Teste de resposta da api');
    }
}

module.exports = new ProductCategoryController();