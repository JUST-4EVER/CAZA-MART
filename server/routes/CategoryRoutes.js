const express = require('express');
const { getCategories, updateCategory, createCategory, deleteCategory } = require('../controllers/CategoriesController');
const userAuthentication = require('../middlewares/UserAuthenticate');
const CategoryRoutes = express.Router();
CategoryRoutes.get('/categories',getCategories);
CategoryRoutes.post('/category/add',userAuthentication,createCategory);
CategoryRoutes.put('/category/:id',userAuthentication,updateCategory);
CategoryRoutes.delete('/category/:id',userAuthentication,deleteCategory);

module.exports = CategoryRoutes;