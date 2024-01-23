const { prisma } = require("../lib/lib");

exports.createCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        const createCateory = await prisma.categories.create({
            data: {
                category_name: category_name,
                description: description
            }
        })
        if (!createCateory) {
            return res.status(404).json({
                status: false,
                message: 'Category not create'
            })
        }

        return res.status(200).json({
            status: true,
            message: 'Category Created'
        })
    } catch (error) {
        console.log('Error creating categories', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        const id = req.params.id;
        const updateCategory = await prisma.categories.update({
            where: {
                id: id,
            },
            data: {
                category_name: category_name,
                description: description
            }
        })

        if (!updateCategory) {
            return res.status(404).json({
                status: false,
                message: 'Category not update'
            })
        }

        return res.status(200).json({
            status: false,
            message: 'Category updated'
        })

    } catch (error) {
        console.log('Error updating categories', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

exports.getCategories = async (req, res) => {
    try {

        const getCategories = await prisma.categories.findMany();
        if(getCategories.length == [] || getCategories.length < 0 ){
            return res.status(404).json({ status: false, message: 'Not Founded Categories'})
        }
        return res.status(200).json({ status: true,getCategories})
    } catch (error) {
        console.log('Error fetching categories', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}

exports.deleteCategory = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteCategory = await prisma.categories.delete({
            where : {
                id : id
            }
        })

        if(!deleteCategory){
            return res.status(404).json({ status: false, message: 'Category not delete'})
        }
        return res.status(404).json({ status: false, message: 'Category  deleted'})
    } catch (error) {
        console.log('Error deleting categories', error.message);
        res.status(500).json({ status: false, message: error.message });
    }
}