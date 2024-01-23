const express = require('express');
const { getCategories, updateCategory, createCategory, deleteCategory } = require('../controllers/CategoriesController');
const CategoryRoutes = express.Router();
CategoryRoutes.get('/categories',getCategories);
CategoryRoutes.post('/Category/add',createCategory);
CategoryRoutes.put('/Category/:id',updateCategory);
CategoryRoutes.delete('/Category/:id',deleteCategory);

module.exports = CategoryRoutes;