const express = require('express');
const {
    createOrder, updateOrder,
    deleteOrder, getOrder, getOrders
} = require('../controllers/OrderControllers');
const customerAuthentication = require('../middlewares/CustomerAuthenticate');
const orderRoutes = express.Router();
orderRoutes.post('/order/add', customerAuthentication, createOrder);
orderRoutes.put('/order/:id', customerAuthentication, updateOrder);
orderRoutes.delete('/order/:id', customerAuthentication, deleteOrder);
orderRoutes.get('/order/:id', customerAuthentication, getOrder);
orderRoutes.get('/orders', customerAuthentication, getOrders);


module.exports = orderRoutes;