const { prisma } = require('../lib/lib')
exports.createProduct = async (req, res) => {
    try {
        const {
            name, description, price, discount, quantity
            , category_id, availibility, size, color, thumbnail
        } = req.body;

        const createProduct = await prisma.products.create({
            data : {
                name : name,
                description : description,
                price : price,
                discount : discount,
                quantity : quantity,
                category_id : category_id,
                availibility : availibility,
                size : size,
                color : color,
                thumbnail : thumbnail
            }
        })

        if(!createProduct){
            return res.json({
                status : false,
                message : 'Product failed to created'
            })
        }

        return res.json({
            status : true,
            message : 'Product created successfully'
        })

    } catch (error) {
        return new Error(error.message);
    }
}


exports.updateProduct = async(req,res) => {
    try {
        const {
            name, description, price, discount, quantity
            , category_id , availibility, size, color, thumbnail
        } = req.body;
        const id = req.params.id;

        const existProduct = await prisma.products.findUnique({where : {id : id}});

        if(!existProduct){
            return res.json({
                status : false,
                message : 'Product not found'
            })
        }
        const updateProduct = await prisma.products.update({
            where : {
                id : id            
            },
            data : {
                name : name,
                description : description,
                price : price,
                discount : discount,
                quantity : quantity,
                category_id : category_id,
                availibility : availibility,
                size : size,
                color : color,
                thumbnail : thumbnail
            }
        })

        if(!updateProduct){
            return res.json({
                status : false,
                message : 'Product failed to updated'
            })
        }

        return res.json({
            status : true,
            message : 'Product updated successfully'
        })
        
    } catch (error) {
        return new Error(error.message);
    }
}

exports.getProducts = async(req,res) => {
    try {

        const getProducts = await prisma.products.findMany();
        if(getProducts.length == []){
            return res.json({
                status : false,
                message : 'Products not found'
            })
        }
        return res.json({
            status : true,
            getProducts
        })
        
    } catch (error) {
        return new Error(error.message);
    }
}

exports.getProduct = async (req, res) => {
    try {

        const id = req.params.id;
        const getProduct = await prisma.products.findUnique({where : {id: id}});
        if(!getProduct){
            return res.json({
                status : false,
                message : 'Product not found'
            })
        }
        return res.json({
            status : true,
            getProduct
        })
        
    } catch (error) {
        return new Error(error.message);
    }
}


exports.deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;
        const getProduct = await prisma.products.findUnique({where : {id: id}});
        if(!getProduct){
            return res.json({
                status : false,
                message : 'Product not found'
            })
        }
        const deleteProduct = await prisma.products.delete({where : {id: id}});
        if(!deleteProduct){
            return res.json({
                status : false,
                message : 'Product failed to deleted'
            })
        }
        return res.json({
            status : true,
            message : 'Product deleted successfully'
        })
        
    } catch (error) {
        return new Error(error.message);
    }
}