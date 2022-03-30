const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 50
    },
    description: {
        type: String,
        require: true,
        maxlength: 200
    },
    quantity: {
        type: Number,
        require: true
    },
    imageLink: String
});

productSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;