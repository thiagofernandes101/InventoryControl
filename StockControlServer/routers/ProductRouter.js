const express = require('express');
const ProductController = require('../controllers/ProductController');

const route = express.Router();
route.get('all/records', ProductController.GetAllRecords);

module.exports = route;