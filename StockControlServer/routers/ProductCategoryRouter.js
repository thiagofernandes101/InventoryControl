const express = require('express');
const ProductCategoryController = require('../controllers/ProductCategoryController');
const ProductCategoryValidation = require('../validations/ProductCategoryValidation');

const route = express.Router();
route.post('/new', ProductCategoryValidation.IsProductCategoryValidToInsert, ProductCategoryController.Create);
route.get('/all/records', ProductCategoryController.GetAllRecords);
route.get('/details/:id', ProductCategoryController.GetRecordsById);
route.delete('/delete/:id', ProductCategoryController.RemoveRecord);
route.put('/edit/:id', ProductCategoryValidation.IsProductCategoryValidToUpdate, ProductCategoryController.UpdateRecord);

route.get('/test', ProductCategoryController.Test);

module.exports = route;