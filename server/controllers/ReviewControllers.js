const express = require('express');
const { prisma } = require('../lib/lib');

exports.createReview = async (req, res) => {
    try {
        const customer_id = req.customerId;
        const { rating, comment, product_id } = req.body;
        const createProduct = await prisma.reviews.create({
            data: {
                rating: rating,
                comment: comment,
                product_id: product_id,
                customer_id: customer_id
            }
        })

        if (!createProduct) {
            return res.json({
                status: false,
                message: 'failed to create review'
            })
        }

        return res.json({
            status: true,
            message: 'successfully to create review'
        })

    } catch (error) {
        console.log('Error creating review', error);
        res.json({
            status: false,
            message: 'Error creating review'
        })
    }
}


exports.updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        const { rating, comment } = req.body;
        const existingReview = await prisma.reviews.findUnique({ where: { id: id } });
        if(!existingReview){
            return res.json({
                status: false,
                message: 'review does not exist'
            })
        }
        const updateProduct = await prisma.reviews.update({
            where : {
                id : id
            },
            data: {
                rating: rating,
                comment: comment
            }
        })

        if (!updateProduct) {
            return res.json({
                status: false,
                message: 'failed to update review'
            })
        }

        return res.json({
            status: true,
            message: 'successfully to update review'
        })

    } catch (error) {
        console.log('Error update review', error);
        res.json({
            status: false,
            message: 'Error update review'
        })
    }
}

exports.deleteReview = async (req,res) => {
    try {

        const id = req.params.id;
        const existingReview = await prisma.reviews.findUnique({ where: { id: id } });
        if(!existingReview){
            return res.json({
                status: false,
                message: 'review does not exist'
            })
        }

        const deleteReview = await prisma.reviews.delete({
            where : { id: id },
        })

        if(!deleteReview){
            return res.json({
                status: false,
                message: 'review failed to delete'
            })
        }

        return res.json({
            status: true,
            message: 'review was deleted successfully'
        })
        
    } catch (error) {
        console.log('Error deleting review',error);
        res.json({
            status : false,
            message : 'Error deleting review'
        })
    }
}

exports.getReview = async (req,res) => {
    try {

        const id = req.params.id;
        const existingReview = await prisma.reviews.findFirst({ where: { product_id: id } });
        if(!existingReview){
            return res.json({
                status: false,
                message: 'product review does not exist'
            })
        }

        const getReview = await prisma.reviews.findMany({
            where : { product_id: id },
        })

        if(getReview.length == []){
            return res.json({
                status: false,
                message: 'reviews failed to retrieve'
            })
        }

        return res.json({
            status: true,
            getReview
        })
        
    } catch (error) {
        console.log('Error retrieving review',error);
        res.json({
            status : false,
            message : 'Error retrieve review'
        })
    }
}
exports.getReviews = async(req,res) => {
    try {

        const getReviews = await prisma.reviews.findMany();
        if(getReviews.length == []){
            return res.json({
                status : false,
                message : 'reviews does not exist'
            })
        }
        res.json({
            status : true,
            getReviews
        })
        
    } catch (error) {
        console.log('Error retrieving review');
        res.json({
            status : false,
            message : 'Error retrieve review'
        })
    }
}