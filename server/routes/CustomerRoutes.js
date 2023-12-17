const express = require('express');
const { 
    registerCustomer, customerLogin, 
    updateCustomer, deleteCustomer, 
    getCustomers, getCurrentCustomer, customerChangePassword
} = require('../controllers/CustomerController');
const customerAuthentication = require('../middlewares/CustomerAuthenticate');
const { registerCustomerValidations, updateCustomerValidations, loginCustomerValidations } = require('../validations/customerValidation/customerValidations');
const customerRoutes = express.Router();
customerRoutes.post('/customer/register', registerCustomerValidations,registerCustomer);
customerRoutes.post('/customer/login', loginCustomerValidations,customerLogin);
customerRoutes.post('/customer/changePassword', customerAuthentication,customerChangePassword);
customerRoutes.put('/customer/:id', updateCustomerValidations,updateCustomer);
customerRoutes.delete('/customer/:id', deleteCustomer);
customerRoutes.get('/customers',getCustomers)
customerRoutes.get('/customer/current',customerAuthentication,getCurrentCustomer)

module.exports = customerRoutes