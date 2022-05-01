const mongoose = require('../dao/configurations/UrlConnection');

const ProductSchema = new mongoose.Schema({
    code: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Number, required: true },
    quantityInSock: { type: Number, required: true },
    minimumStock: { type: Number, required: true },
    active: { type: Boolean, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);