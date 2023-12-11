const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_USER_KEY = process.env.JWT_USER
const JWT_CUSTOMER_KEY = process.env.JWT_CUSTOMER
module.exports = {
    prisma,
    JWT_USER_KEY,
    JWT_CUSTOMER_KEY
}