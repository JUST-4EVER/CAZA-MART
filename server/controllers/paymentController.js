const Stripe = require('stripe');
const { prisma } = require('../lib/lib');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
require('dotenv').config()

exports.createPayment = async (req, res) => {
    try {
        const cartData = req.body.products.map(item => 
            ({ id: item.id, quantity: item.quantity , product_name : item.name, thumbnail : item.thumbnail}));
        const cartString = JSON.stringify(cartData);

        // Ensure the stringified cart is under 500 characters
        if (cartString.length > 500) {
            console.error('Error: Cart string exceeds 500 characters');
            return res.status(400).json({ error: 'Cart string exceeds 500 characters' });
        }

        // Create a customer with metadata
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.body.userId,
                cart: cartString,
            },
        });

        // Create line items for the checkout session
        const line_items = req.body.products.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.thumbnail],
                        description: item.description,
                        metadata: {
                            id: JSON.stringify(item.id)
                        },
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            };
        });

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "SO"],
            },
            shipping_options: [
                // Shipping options here
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: "payment",
            customer: customer.id,
            success_url: "http://localhost:5173/success-payment",
            cancel_url: "http://localhost:5173/item-cart",
        });
        // const session_data = await session;
        // console.log('session_data',session_data);
        // Send the session URL as a JSON response
        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        // Send an error response with status 500
        res.status(500).json({ error: "An error occurred during payment creation.", details: error.message });
    }
}
