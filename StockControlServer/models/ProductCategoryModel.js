const mongoose = require('../dao/configurations/UrlConnection');

const ProductCategorySchema = new mongoose.Schema({
    code: { type: Number, required: true },
    description: { type: String, required: true}
});

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);