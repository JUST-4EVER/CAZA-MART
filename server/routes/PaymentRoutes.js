const express = require('express');
require('dotenv').config();
const Stripe = require('stripe');
const bodyParser = require("body-parser");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { prisma } = require('../lib/lib');
const customerAuthentication = require('../middlewares/CustomerAuthenticate');
const { createPayment } = require('../controllers/paymentController');
const paymentRoutes = express.Router();
paymentRoutes.post('/payment/checkout', customerAuthentication, createPayment);
// const createOrder = async (data, customer) => {
//   console.log('data', data);
//   console.log('customerId', customer.metadata);
//   const Items = JSON.parse(customer.metadata.cart);
//   const userId = customer.metadata.userId
//   console.log("Items_id", Items[0].id);
//   console.log("Items quantity ", Items[0].quantity);
//   console.log('userId', userId);
//   console.log('data_payment_intent', data.payment_intent);
//   console.log('data_amount_subtotal', data.amount_subtotal);
//   console.log('data_amount_total', data.amount_total);
//   console.log(' data_customer_details', data?.customer_details);
//   console.log(' data_payment_status', data?.payment_status);

//   const orderStatus = data?.payment_status;
//   const subtotalAmount = data?.amount_subtotal;
//   const totalAmount = data?.amount_total;
//   const customerDetails = JSON.stringify(data?.customer_details);
//   const newOrder = await prisma.orders.create({
//     data: {
//       customer_id: userId,
//       paymentIntentId: data.payment_intent,
//       product_id: Items[0]?.id,
//       quantity: Items[0]?.quantity,
//       product_name: Items[0]?.product_name,
//       thumbnail: Items[0]?.thumbnail,
//       subtotal: subtotalAmount,
//       total: totalAmount,
//       shipping: customerDetails,
//       payment_status: orderStatus,
//     },
//   });

//   try {
//     if (!newOrder) {
//       return {
//         status: false,
//         message: 'Not processed Order:'
//       };
//     }

//     return {
//       status: true,
//       message: 'Processed Order'
//     };
//   } catch (err) {
//     console.log(err);
//     throw new Error('An error occurred while creating the order.');
//   }
// };

const createOrder = async (data, customer) => {
  try {
    const Items = JSON.parse(customer.metadata.cart);
    const userId = customer.metadata.userId;

    // Iterate through each item in the cart and create an order entry
    const orderPromises = Items.map(async (item) => {
      return prisma.orders.create({
        data: {
          customer_id: userId,
          paymentIntentId: data.payment_intent,
          product_id: item.id,
          quantity: item.quantity,
          product_name: item.product_name,
          thumbnail: item.thumbnail,
          subtotal: data.amount_subtotal,
          total: data.amount_total,
          shipping: JSON.stringify(data.customer_details),
          payment_status: data.payment_status,
        },
      });
    });

    // Wait for all orders to be created
    const orders = await Promise.all(orderPromises);

    // Check if any order creation failed
    const failedOrder = orders.find((order) => !order);

    if (failedOrder) {
      return {
        status: false,
        message: 'Not processed Order',
      };
    }

    return {
      status: true,
      message: 'Processed Order',
    };
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while creating the order.');
  }
};

paymentRoutes.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEB_HOOK;
  const requestData = request.body.data.object
  const eventType = request.body.type;
  if (eventType == "checkout.session.completed") {
    const customer = requestData.customer;
    await stripe.customers.retrieve(customer).then(async (customer) => {
      try {
        const result = await createOrder(requestData, customer);
        if (result.status) {
          console.log(result.message); // Order processed successfully
        } else {
          console.log(result.message); // Order processing failed
        }
      } catch (err) {
        console.log(err);
      }
    }).catch((err) => console.log(err.message));
  }
  try {
    const event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    const data = event.data.object; // Access the nested object
    // console.log('data is:', data);

    // if (eventType == "checkout.session.completed") {
    //   const customerId = data.customer;
    //   await stripe.customers.retrieve(customerId).then(async (customer) => {
    //     try {
    //       const result = await createOrder(data, customerId);
    //       if (result.status) {
    //         console.log(result.message); // Order processed successfully
    //       } else {
    //         console.log(result.message); // Order processing failed
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }).catch((err) => console.log(err.message));
    // }

    response.send();
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = paymentRoutes;