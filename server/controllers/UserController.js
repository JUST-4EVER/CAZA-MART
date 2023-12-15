const { prisma, JWT_USER_KEY } = require("../lib/lib");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerUser = async (req,res) => {
    try {

        const {username , email , password , role} = req.body;
        const userExist = await prisma.users.findUnique({ where : { email : email}})
        if(userExist){
            return res.json({
                status: false,
                message: 'user already exist'
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.users.create({
            data : {
                username : username?.trim(),
                email : email?.trim(),
                password : hashedPassword,
                role : role?.trim()
            }
        })

        if(!newUser){
            return res.json({
                status: false,
                message: 'user not registered'
            })
        }

        res.json({
            status: true,
            message: 'user registered successfully'
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
const getUsers = async (req,res) => {
    try {
        const users = await prisma.users.findMany();
        if(users.length == [] || users.length < 0){
            return res.json({
                status: false,
                message: 'no users found'
            })
        }
        res.json({
            status: true,
            users
        })
        
    } catch (error) {
        res.json({
            status : false,
            message : error.message
        })
    }
}


const updateUser = async (req , res) => {
    try {
        
        const { username , email , role } = req.body;
        const id = req.params.id;
        const userExist = await prisma.users.findUnique({ where : { id : id}});
        if(!userExist){
            return res.json({
                status: false,
                message: 'user not found'
            })
        }
        const updateUser = await prisma.users.update({
            where : {
                id : id
            },
            data : {
                username : username?.trim(),
                email : email?.trim(),
                role : role?.trim()
            }
        })

        if(!updateUser){
            return res.json({
                status: false,
                message: 'user not updated'
            })
        }

        res.json({
            status: true,
            message: 'user updated successfully'
        })
        
    } catch (error) {
        res.json({
            status : false,
            message : error.message
        })
    }
}


const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;
        const userExist = await prisma.users.findUnique({where : { id : id }});
        if(!userExist){
            return res.json({
                status: false,
                message: 'user not found'
            })
        }
        const deleteUser = await prisma.users.delete({
            where : {
                id : id
            }
        })

        if(!deleteUser){
            return res.json({
                status : false,
                message : 'user not deleted'
            })
        }

        res.json({
            status : true,
            message : 'user successfully deleted'
        })
        
    } catch (error) {
        res.json({
            status : false,
            message : error.message
        })
    }
}


const userLogin = async (req, res) => {
    try {
        const {email , username , password} = req.body;
        const userExist = await prisma.users.findUnique({ where : {email : email?.trim()}});
        if(!userExist){
            return res.json({
                status : false,
                message : 'invalid email | username and password'
            })
        }
        const comparePassword = await bcrypt.compare(password , userExist.password );
        if(!comparePassword){
            return res.json({
                status : false,
                message : 'invalid email | username and password'
            })
        }
        const UserToken = await jwt.sign({userId : userExist.id},JWT_USER_KEY);
        res.cookie('UserToken',UserToken,{
            httpOnly : true,
            secure : false,
            expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        })
        res.json({
            status : true,
            UserToken,
            userExist
        })
        
    } catch (error) {
        res.json({
            status : false,
            message : error.message
        })
    }
}


const getCurrentUser = async (req, res) => {
    try {

        const userId = req.userId;

        const userExist = await prisma.users.findUnique({where : {id : userId}})
        if(!userExist){
            return res.json({
                status : false,
                message : 'user not found'
            })
        }

        res.json({
            status : true,
            userExist
        })
        
    } catch (error) {
        return res.json({
            status : false,
            message : error.message
        })
    }
}


module.exports = {
    getUsers,
    registerUser,
    updateUser,
    deleteUser,
    userLogin,
    getCurrentUser
}
