const express = require('express');
const { registerCustomer, updateCustomer, deleteCustomer, getCustomers, customerLogin, getCurrentCustomer } = require('../controller/CustomerController');
const customerAuthentication = require('../middleware/CustomerAuthenticate');
const customerRoutes = express.Router();
customerRoutes.post('/customer/register', registerCustomer);
customerRoutes.post('/customer/login', customerLogin);
customerRoutes.put('/customer/:id', updateCustomer);
customerRoutes.delete('/customer/:id', deleteCustomer);
customerRoutes.get('/customers',getCustomers)
customerRoutes.get('/customer/current',customerAuthentication,getCurrentCustomer)

module.exports = customerRoutes