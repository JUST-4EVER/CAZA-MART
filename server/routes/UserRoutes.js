const express = require('express');
const { getUsers, registerUser, updateUser, deleteUser, userLogin, getCurrentUser } = require('../controller/UserController');
const userAuthentication = require('../middleware/UserAuthenticate');
const userRoutes = express.Router();
userRoutes.post('/user/register',registerUser)
userRoutes.post('/user/login',userLogin)
userRoutes.put('/user/:id',updateUser)
userRoutes.delete('/user/:id',deleteUser)
userRoutes.get('/users',getUsers)
userRoutes.get('/user/current', userAuthentication ,getCurrentUser)
module.exports = userRoutes;