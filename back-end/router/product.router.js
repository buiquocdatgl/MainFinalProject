const productRouter = require('express').Router();
const { uploadProduct } = require("../middleware/multer");
const {
    createProduct,
    updateProduct,
    getProducts,
    deleteProduct,
    getSingleProduct
} = require('../controller/product.controller');
const db = require("../service/db");

const { Product } = db

productRouter.get('/', getProducts);
productRouter.get('/:id', getSingleProduct);
productRouter.post('/', uploadProduct.single("image"), createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);
    


module.exports = productRouter;