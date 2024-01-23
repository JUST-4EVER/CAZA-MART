const express = require('express');
const { getCategories, updateCategory, createCategory, deleteCategory } = require('../controllers/CategoriesController');
const CategoryRoutes = express.Router();
CategoryRoutes.get('/categories',getCategories);
CategoryRoutes.post('/create/Category',createCategory);
CategoryRoutes.put('/update/Category/:id',updateCategory);
CategoryRoutes.delete('/delete/Category',deleteCategory);

module.exports = CategoryRoutes;