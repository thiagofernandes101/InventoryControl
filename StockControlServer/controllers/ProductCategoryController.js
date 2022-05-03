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

    async GetRecordsById(request, response) {
        let id = request.params.id;
        
        await ProductCategoryModel.findOne({ "code": id })
            .then(successResponse => { return response.status(200).json(successResponse) })
            .catch(errorResponse => { return response.status(500).json(errorResponse) });
    }

    async GetAllRecords(request, response) {
        await ProductCategoryModel.find().sort('code')
        .then(successResponse => {
            return response.status(200).json(successResponse);
        })
        .catch(errorResponse => {
            return response.status(500).json(errorResponse);
        });
    }

    async RemoveRecord(request, response) {
        let id = request.params.id;
        
        await ProductCategoryModel.findOneAndDelete({"code": id})
        .then(successResponse => {
            return response.status(200).json(successResponse);
        })
        .catch(errorResponse => {
            return response.status(500).json(errorResponse);
        });
    }

    async Test(request, response) {
        console.log("Chamada do método de teste pela aplicação mobile");
        return response.status(200).json('Teste de resposta da api');
    }
}

module.exports = new ProductCategoryController();