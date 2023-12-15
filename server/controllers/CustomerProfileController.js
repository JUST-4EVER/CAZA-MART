const { prisma } = require('../lib/lib')
const addCustomerProfile = async (req, res) => {
    try {
        const customerId = req.customerId
        const { fname, lname, bio, avatar, facebookLink, instagramLink, twitterLink, linkedinLink } = req.body;
        const addCustomerProfile = await prisma.customerProfiles.create({
            data: {
                customerId: customerId,
                fname: fname.trim(),
                lname: lname.trim(),
                bio: bio.trim(),
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

        const { fname, lname, bio, avatar, facebookLink, instagramLink, linkedinLink, twitterLink } = req.body;
        const id = req.params.id;
        const checkCustomerProfileExist = await prisma.customerProfiles.findUnique({ where: { id: id } })
        if (!checkCustomerProfileExist) {
            return res.json({
                status: false,
                message: 'customer profile not found'
            })
        }

        const updateCustomerProfile = await prisma.customerProfiles.update({
            where: {
                id: id
            },
            data: {
                fname: fname.trim(),
                lname: lname.trim(),
                bio: bio.trim(),
                avatar: avatar?.trim(),
                facebookLink: facebookLink?.trim(),
                instagramLink: instagramLink?.trim(),
                linkedinLink: linkedinLink?.trim(),
                twitterLink: twitterLink?.trim()
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

        const customerProfile = await prisma.customerProfiles.findMany();
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

        const id = req.params.id;
        const checkCustomerProfileExist = await prisma.customerProfiles.findUnique({ where: { id: id } })
        if (!checkCustomerProfileExist) {
            return res.json({
                status: false,
                message: 'customer profile not found'
            })
        }

        const deleteCustomerProfile = await prisma.customerProfiles.delete({ where: { id: id } })

        if (!deleteCustomerProfile) {
            return res.json({
                status: false,
                message: 'customer profile not deleted'
            })
        }
        res.json({
            status: true,
            message: 'customer profile deleted'
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
        const currentCustomerProfile = await prisma.customerProfiles.findFirst({ where: { customerId: customerId } })
        if (!currentCustomerProfile) {
            return res.json({
                status: false,
                message: 'current customer not found'
            })
        }

        res.json({
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