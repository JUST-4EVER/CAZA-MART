const { prisma } = require('../lib/lib')
const addCustomerProfile = async (req, res) => {
    try {
        const customerId = req.customerId
        const {
            fname, lname, bio, avatar,
            address, age, phone, sex,
            facebookLink, instagramLink,
            twitterLink, linkedinLink } = req.body;
        const addCustomerProfile = await prisma.customerProfiles.create({
            data: {
                customerId: customerId,
                fname: fname.trim(),
                lname: lname.trim(),
                phone: phone,
                address: address?.trim(),
                age: age,
                sex: sex?.trim(),
                bio: bio?.trim(),
                avatar: avatar?.trim(),
                facebookLink: facebookLink?.trim(),
                instagramLink: instagramLink?.trim(),
                twitterLink: twitterLink?.trim(),
                linkedinLink: linkedinLink?.trim()
            }
        })

        if (!addCustomerProfile) {
            return res.json({
                status: false,
                message: 'customer profile not created'
            })
        }

        res.json({
            status: true,
            message: 'customer profile created'
        })

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}

const updateCustomerProfile = async (req, res) => {
    try {
        const customerId = req.customerId
        const id = req.params.id;
        const {
            username, email,
            fname, lname, bio, avatar,
            address, age, phone, sex,
            facebookLink, instagramLink,
            twitterLink, linkedinLink } = req.body;
        const checkCustomerProfileExist = await prisma.customerProfiles.findUnique({ where: { id: id } })
        if (!checkCustomerProfileExist) {
            return res.json({
                status: false,
                message: 'customer profile not found'
            })
        }

        const updateCustomer = await prisma.customers.update({
            where: {
                id: customerId
            },
            data: {
                username: username,
                email: email
            }
        })


        if (!updateCustomer) {
            return res.json({
                status: false,
                message: 'customer not updated'
            })
        }

        const updateCustomerProfile = await prisma.customerProfiles.update({
            where: {
                id: id
            },
            data: {
                fname: fname,
                lname: lname,
                phone: phone,
                address: address?.trim(),
                age: age,
                sex: sex?.trim(),
                avatar: avatar,
                bio: bio?.trim(),
                facebookLink: facebookLink?.trim(),
                instagramLink: instagramLink?.trim(),
                twitterLink: twitterLink?.trim(),
                linkedinLink: linkedinLink?.trim()
            }
        })


        if (!updateCustomerProfile) {
            return res.json({
                status: false,
                message: 'customer profile not updated'
            })
        }

        res.json({
            status: true,
            message: 'customer profile updated'
        })



    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


const getCustomersProfile = async (req, res) => {
    try {

        const customerProfile = await prisma.customers.findMany({ include: { customerProfiles: true } });
        if (customerProfile.length == [] || customerProfile.length < 0) {
            return res.json({
                status: false,
                message: 'customer profile not found'
            })
        }

        res.json({
            status: true,
            customerProfile
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


const deleteCustomerProfile = async (req, res) => {
    try {

        const customerId = req.customerId
        const checkCustomerProfileExist = await prisma.customerProfiles.findFirst({ where: { customerId: customerId } })
        if (!checkCustomerProfileExist) {
            return res.json({
                status: false,
                message: 'customer profile not found'
            })
        }

        const deleteCustomerProfile = await prisma.customerProfiles.delete({ where: { customerId: customerId } })

        if (!deleteCustomerProfile) {
            return res.json({
                status: false,
                message: 'customer profile not deleted'
            })
        }

        const deleteCustomer = await prisma.customers.delete({ where: { id: customerId } })
        if (!deleteCustomer) {
            return res.json({
                status: false,
                message: 'customer not deleted'
            })
        }
        res.json({
            status: true,
            message: 'customer deleted'
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

const getCurrentCustomerProfile = async (req, res) => {
    try {

        const customerId = req.customerId
        const currentCustomerProfile = await prisma.customerProfiles.findFirst({
            where: { customerId: customerId }
        })
        if (!currentCustomerProfile) {
            return res.json({
                status: false,
                message: 'current customer not found'
            })
        }

        return res.json({
            status: true,
            currentCustomerProfile
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
module.exports = {
    addCustomerProfile,
    updateCustomerProfile,
    getCustomersProfile,
    deleteCustomerProfile,
    getCurrentCustomerProfile
}