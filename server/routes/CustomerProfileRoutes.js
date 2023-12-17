const express = require('express');
const { addCustomerProfile, updateCustomerProfile, deleteCustomerProfile, getCustomersProfile, getCurrentCustomerProfile } = require('../controllers/CustomerProfileController');
const customerAuthentication = require('../middlewares/CustomerAuthenticate');
const { addCustomerProfileValidations } = require('../validations/customerProfileValidation/customerProfileValidation');

const CustomerProfileRoutes = express.Router();
CustomerProfileRoutes.post('/customerProfile/add',customerAuthentication,addCustomerProfileValidations,addCustomerProfile);
CustomerProfileRoutes.put('/customerProfile/:id',customerAuthentication,addCustomerProfileValidations,updateCustomerProfile);
CustomerProfileRoutes.delete('/customerProfile/:id',customerAuthentication,addCustomerProfileValidations,deleteCustomerProfile);
CustomerProfileRoutes.get('/customerProfiles',customerAuthentication,getCustomersProfile);
CustomerProfileRoutes.get('/customerProfile',customerAuthentication,customerAuthentication,getCurrentCustomerProfile);
module.exports = CustomerProfileRoutes;