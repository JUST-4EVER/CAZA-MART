const express = require('express');
const customerAuthentication = require('../middlewares/CustomerAuthenticate');
const { 
    createReview, updateReview, 
    deleteReview, getReview, getReviews 
} = require('../controllers/ReviewControllers');
const reviewRoutes = express.Router();
reviewRoutes.post('/review/add',customerAuthentication,createReview);
reviewRoutes.put('/review/:id',customerAuthentication,updateReview);
reviewRoutes.delete('/review/:id',customerAuthentication,deleteReview);
reviewRoutes.get('/review/:id',customerAuthentication,getReview);
reviewRoutes.get('/reviews',getReviews);

module.exports = reviewRoutes;