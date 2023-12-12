const { prisma, JWT_CUSTOMER_KEY } = require('../lib/lib')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerCustomer = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const customerExist = await prisma.customers.findUnique({ where: { email: email } });
        if (customerExist) {
            return res.json({
                status: false,
                message: 'user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = await prisma.customers.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        if (!newCustomer) {
            return res.json({
                status: false,
                message: 'user not created'
            })
        }

        res.json({
            status: true,
            message: 'user created'
        })



    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

const customerLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const customerExist = await prisma.customers.findUnique({ where: { email: email } });
        if (!customerExist) {
            return res.json({
                status: false,
                message: 'invalid email | username or password'
            })
        }

        const comparePassword = await bcrypt.compare(password, customerExist.password);
        if (!comparePassword) {
            return res.json({
                status: false,
                message: 'invalid email | username or password'
            })
        }

        const CutomerToken = await jwt.sign({ customerId: customerExist.id }, JWT_CUSTOMER_KEY);
        res.cookie('cutomerToken', CutomerToken, {
            httpOnly: true,
            secure: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        })

        res.json({
            status: true,
            message: 'login success',
            customerExist,
            CutomerToken
        })


    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


const getCustomers = async (req, res) => {
    try {

        const customers = await prisma.customers.findMany();
        if (customers.length == [] || customers.length < 0) {
            return res.json({
                status: false,
                message: 'no customers found'
            })
        }

        res.json({
            status: true,
            customers
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

const updateCustomer = async (req, res) => {
    try {

        const { id } = req.params;
        const { username, email } = req.body;
        const customerExist = await prisma.customers.findUnique({ where: { id: id } });
        if (!customerExist) {
            return res.json({
                status: false,
                message: 'user not found'
            })
        }
        const updateCustomer = await prisma.customers.update({
            where: {
                id: id
            },
            data: {
                username: username,
                email: email
            }
        })

        if (!updateCustomer) {
            return res.json({
                status: false,
                message: 'user not updated'
            })
        }

        res.json({
            status: true,
            message: 'user updated'
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

const deleteCustomer = async (req, res) => {
    try {

        const { id } = req.params;
        const customerExist = await prisma.customers.findUnique({ where: { id: id } });
        if (!customerExist) {
            return res.json({
                status: false,
                message: 'user not found'
            })
        }
        const deleteCustomer = await prisma.customers.delete({
            where: {
                id: id
            }
        })
        if (!deleteCustomer) {
            return res.json({
                status: false,
                message: 'user not deleted'
            })
        }
        res.json({
            status: true,
            message: 'user deleted'
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

const getCurrentCustomer = async (req, res) => {
    try {

        const customerId = req.customerId;
        const customer = await prisma.customers.findUnique({ where: { id: customerId } })

        if(!customer){
            return res.json({
                status: false,
                message: 'user not found'
            })
        }

        res.json({
            status: true,
            customer
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


module.exports = {
    registerCustomer,
    customerLogin,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getCurrentCustomer
}