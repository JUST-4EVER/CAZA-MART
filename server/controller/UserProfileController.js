const { prisma } = require('../lib/lib')
const addUserProfile = async (req, res) => {
    try {
        const userId = req.userId
        const { fname, lname, bio, avatar, facebookLink, instagramLink, twitterLink, linkedinLink } = req.body;
        const addUserProfile = await prisma.userProfiles.create({
            data: {
                user_id: userId,
                fname: fname,
                lname: lname,
                bio: bio,
                avatar: avatar,
                facebookLink: facebookLink,
                instagramLink: instagramLink,
                twitterLink: twitterLink,
                linkedinLink: linkedinLink
            }
        })

        if (!addUserProfile) {
            return res.json({
                status: false,
                message: 'user profile not created'
            })
        }

        res.json({
            status: true,
            message: 'user profile created'
        })

    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}

const updateUserProfile = async (req, res) => {
    try {

        const { fname, lname, bio, avatar, facebookLink, instagramLink, linkedinLink, twitterLink } = req.body;
        const id = req.params.id;
        const checkUserProfileExist = await prisma.userProfiles.findUnique({ where: { id: id } })
        if (!checkUserProfileExist) {
            return res.json({
                status: false,
                message: 'User profile not found'
            })
        }

        const updateUserProfile = await prisma.userProfiles.update({
            where: {
                id: id
            },
            data: {
                fname: fname,
                lname: lname,
                bio: bio,
                avatar: avatar,
                facebookLink: facebookLink,
                instagramLink: instagramLink,
                linkedinLink: linkedinLink,
                twitterLink: twitterLink
            }
        })

        if (!updateUserProfile) {
            return res.json({
                status: false,
                message: 'user profile not updated'
            })
        }

        res.json({
            status: true,
            message: 'user profile updated'
        })



    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


const getUsersProfile = async (req, res) => {
    try {

        const usersProfile = await prisma.userProfiles.findMany();
        if (usersProfile.length == [] || usersProfile.length < 0) {
            return res.json({
                status: false,
                message: 'User profile not found'
            })
        }

        res.json({
            status: true,
            usersProfile
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


const deleteUserProfile = async (req, res) => {
    try {

        const id = req.params.id;
        const checkUserProfileExist = await prisma.userProfiles.findUnique({ where: { id: id } })
        if (!checkUserProfileExist) {
            return res.json({
                status: false,
                message: 'User profile not found'
            })
        }

        const deleteUserProfile = await prisma.userProfiles.delete({ where: { id: id } })

        if (!deleteUserProfile) {
            return res.json({
                status: false,
                message: 'user profile not deleted'
            })
        }
        res.json({
            status: true,
            message: 'user profile deleted'
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

const getCurrentUserProfile = async (req, res) => {
    try {

        const userId = req.userId
        const currentUserProfile = await prisma.userProfiles.findFirst({ where: { user_id: userId } })
        if (!currentUserProfile) {
            return res.json({
                status: false,
                message: 'current user not found'
            })
        }

        res.json({
            status: true,
            currentUserProfile
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
module.exports = {
    addUserProfile,
    updateUserProfile,
    getUsersProfile,
    deleteUserProfile,
    getCurrentUserProfile
}