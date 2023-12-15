const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProduct, getProducts } = require('../controllers/ProductControllers');
const userAuthentication = require('../middlewares/UserAuthenticate');
const { productValidations } = require('../validations/productValidation/ProductValidation');
const productRoutes = express.Router();
productRoutes.post('/product/add', userAuthentication,productValidations,createProduct);
productRoutes.put('/product/:id',userAuthentication,productValidations, updateProduct);
productRoutes.delete('/product/:id', deleteProduct);
productRoutes.get('/product/:id', getProduct);
productRoutes.get('/products', getProducts);

module.exports = productRoutes;