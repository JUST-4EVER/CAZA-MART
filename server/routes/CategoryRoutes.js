const express = require('express');
const { getCategories, updateCategory, createCategory, deleteCategory } = require('../controllers/CategoriesController');
const CategoryRoutes = express.Router();
CategoryRoutes.get('/categories',getCategories);
CategoryRoutes.post('/category/add',createCategory);
CategoryRoutes.put('/category/:id',updateCategory);
CategoryRoutes.delete('/category/:id',deleteCategory);

module.exports = CategoryRoutes;