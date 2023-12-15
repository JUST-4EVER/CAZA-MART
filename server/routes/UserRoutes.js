const express = require('express');
const {
    getUsers, registerUser,
    updateUser, deleteUser,
    userLogin, getCurrentUser 
} = require('../controllers/UserController');
const userAuthentication = require('../middlewares/UserAuthenticate');
const {
    updateUserValidation, 
    registerUserValidation,
    loginUserValidation
} = require('../validations/userValidations/UserValidation');
const userRoutes = express.Router();
userRoutes.post('/user/register', registerUserValidation, registerUser)
userRoutes.post('/user/login', loginUserValidation, userLogin)
userRoutes.put('/user/:id', updateUserValidation, updateUser)
userRoutes.delete('/user/:id', deleteUser)
userRoutes.get('/users', getUsers)
userRoutes.get('/user/current', userAuthentication, getCurrentUser)
module.exports = userRoutes;