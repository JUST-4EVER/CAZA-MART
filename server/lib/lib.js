const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_USER_KEY = process.env.JWT_USER
const JWT_CUSTOMER_KEY = process.env.JWT_CUSTOMER
const STRIPE_PUBLISHIBLE_KEY = process.env.STRIPE_PUBLISHIBLE_KEY
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
module.exports = {
    prisma,
    JWT_USER_KEY,
    JWT_CUSTOMER_KEY,
    STRIPE_PUBLISHIBLE_KEY,
    STRIPE_SECRET_KEY
}