const express = require('express');
const {
    createOrder, updateOrder,
    deleteOrder, getOrders, getCustomerOrders, monthlyOrders
} = require('../controllers/OrderControllers');
const customerAuthentication = require('../middlewares/CustomerAuthenticate');
const userAuthentication = require('../middlewares/UserAuthenticate');
const orderRoutes = express.Router();
orderRoutes.post('/order/add', customerAuthentication, createOrder);
orderRoutes.put('/order/:id', customerAuthentication, updateOrder);
orderRoutes.delete('/order/:id', customerAuthentication, deleteOrder);
orderRoutes.get('/order', customerAuthentication, getCustomerOrders);
orderRoutes.get('/orders', getOrders);
orderRoutes.get('/orders/monthly', userAuthentication , monthlyOrders);


module.exports = orderRoutes;