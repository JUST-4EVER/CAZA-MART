const { prisma } = require('../lib/lib');
// exports.createOrder = async (req, res) => {
//     try {
//         const {
//             shipping_address, payment, orderItems
//         } = req.body;
//         const total_amount = orderItems.reduce((total, item) => {
//             return total + item.price * item.quantity;
//         }, 0)
//         const customer_id = req.customerId;
//         const createOrder = await prisma.orders.create({
//             data: {
//                 customer_id: customer_id,
//                 shipping_address: shipping_address,
//                 payment: payment,
//                 total_amount: total_amount,
//                 orderItems: {
//                     create: orderItems.map(orderItem => ({
//                         product_id: orderItem.product_id,
//                         quantity: orderItem.quantity,
//                         price: orderItem.price,
//                     })),
//                 }
//             },
//             include: {
//                 orderItems: true
//             }
//         })

//         if (!createOrder) {
//             return res.json({
//                 status: false,
//                 message: 'order failed to be created'
//             })
//         }

//         return res.json({
//             status: true,
//             message: 'order was created successfully'
//         })

//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({
//             status: false,
//             message: 'Unable to create order'
//         });
//     }
// }



// exports.updateOrder = async (req, res) => {
//     try {
//         const {
//             shipping_address, payment, order_status, orderItems
//         } = req.body;
//         const total_amount = orderItems.reduce((total, item) => {
//             return total + item.price * item.quantity;
//         }, 0)

//         const id = req.params.id;

//         const existingOder = await prisma.orders.findUnique({ where: { id: id } })
//         if (!existingOder) {
//             return res.json({
//                 status: false,
//                 message: 'order does not exist'
//             })
//         }

//         const updateOrder = await prisma.orders.update({
//             where: {
//                 id: id
//             },
//             data: {
//                 shipping_address: shipping_address,
//                 payment: payment,
//                 total_amount: total_amount,
//                 order_status: order_status,
//                 orderItems: {
//                     deleteMany: {},
//                     createMany: {
//                         data: orderItems
//                     }
//                 }
//             },
//             include: {
//                 orderItems: true
//             }
//         })

//         if (!updateOrder) {
//             return res.json({
//                 status: false,
//                 message: 'order failed to update'
//             })
//         }

//         return res.json({
//             status: true,
//             message: 'order was updated successfully'
//         })

//     } catch (error) {
//         console.error('Error updating order:', error);
//         res.status(500).json({
//             status: false,
//             message: 'Unable to update order'
//         });
//     }
// }



// exports.deleteOrder = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const existingOrder = await prisma.orders.findUnique(
//             {
//                 where : {
//                     id : id
//                 }
//             }
//         );
//         if (!existingOrder) {
//             return res.json({
//                 status: false,
//                 message: 'order does not exist'
//             })
//         }
//         const deleteOrderItems = await prisma.orderItems.deleteMany({ where: { order_id: id }});
//         if (!deleteOrderItems) {
//             return res.json({
//                 status: false,
//                 message: 'orderItems failed to delete'
//             })
//         }
//         const deleteOrder = await prisma.orders.delete({
//             where : {
//                 id : id
//             }
//         })
//         if(!deleteOrder){
//             return res.json({
//                 status : false,
//                 message : 'Order failed to delete'
//             });
//         }
//         return res.json({
//             status: true,
//             message: 'order was successfully deleted'
//         })
//     } catch (error) {
//         console.log('Error deleting order : ', error);
//         res.json({
//             status: false,
//             message: 'Error deleting order'
//         })
//     }
// }


// exports.getOrders = async (req, res) => {
//     try {

//         const getOrders = await prisma.orders.findMany({ include: { orderItems: true } });
//         if (getOrders.length == []) {
//             return res.json({
//                 status: false,
//                 message: 'No orders found'
//             })
//         }
//         return res.json({
//             status: true,
//             getOrders
//         })

//     } catch (error) {
//         console.error('Error retrieving orders:', error);
//         res.status(500).json({
//             status: false,
//             message: 'Unable to retrieving orders'
//         });
//     }
// }



exports.createOrder = async (req, res) => {
    try {
        const {
            product_id, quantity, total, subtotal, delivery_status
            , shipping, payment_status,
        } = req.body;
        const customer_id = req.customerId;
        const createOrder = await prisma.orders.create({
            data: {
                product_id: product_id,
                quantity: quantity,
                total: total,
                subtotal: subtotal,
                delivery_status: delivery_status,
                shipping: shipping,
                payment_status: payment_status,
                customer_id: customer_id
            }

        })

        if (!createOrder) {
            return res.json({
                status: false,
                message: 'order failed to be created'
            })
        }

        return res.json({
            status: true,
            message: 'order was created successfully'
        })

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            status: false,
            message: 'Unable to create order'
        });
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const {
            product_id, quantity, total, subtotal, delivery_status
            , shipping, payment_status,
        } = req.body;
        const id = req.params.id;

        const existingOder = await prisma.orders.findUnique({ where: { id: id } })
        if (!existingOder) {
            return res.json({
                status: false,
                message: 'order does not exist'
            })
        }

        const updateOrder = await prisma.orders.update({
            where: {
                id: id
            },
            data: {
                product_id: product_id,
                quantity: quantity,
                total: total,
                subtotal: subtotal,
                delivery_status: delivery_status,
                shipping: shipping,
                payment_status: payment_status,
                customer_id: customer_id
            }
        })

        if (!updateOrder) {
            return res.json({
                status: false,
                message: 'order failed to update'
            })
        }

        return res.json({
            status: true,
            message: 'order was updated successfully'
        })

    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({
            status: false,
            message: 'Unable to update order'
        });
    }
}

exports.getOrders = async (req, res) => {
    try {

        const getOrders = await prisma.orders.findMany();
        if (getOrders.length == []) {
            return res.json({
                status: false,
                message: 'No orders found'
            })
        }
        return res.json({
            status: true,
            getOrders
        })

    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({
            status: false,
            message: 'Unable to retrieving orders'
        });
    }
}


exports.getCustomerOrders = async (req, res) => {
    try {

        const customer_id = req.customerId;
        const getCustomerOrder = await prisma.orders.findMany(
            {
                where: {
                    customer_id: customer_id
                }
            }
        );
        if (!getCustomerOrder) {
            return res.json({
                status: false,
                message: 'No order found'
            })
        }
        return res.json({
            status: true,
            getCustomerOrder
        })

    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({
            status: false,
            message: 'Unable to retrieving order'
        });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const existingOrder = await prisma.orders.findUnique(
            {
                where: {
                    id: id
                }
            }
        );
        if (!existingOrder) {
            return res.json({
                status: false,
                message: 'order does not exist'
            })
        }
        const deleteOrder = await prisma.orders.delete({
            where: {
                id: id
            }
        })
        if (!deleteOrder) {
            return res.json({
                status: false,
                message: 'Order failed to delete'
            });
        }
        return res.json({
            status: true,
            message: 'order was successfully deleted'
        })
    } catch (error) {
        console.log('Error deleting order : ', error);
        res.json({
            status: false,
            message: 'Error deleting order'
        })
    }
}

exports.monthlyOrders =  async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const orders = await prisma.orders.findMany({
            where: {
                createdAt: {
                    gte: previousMonth
                }
            },
            select: {
                createdAt: true,
                amount: true
            }
        });

        const income = orders.reduce((acc, order) => {
            const month = new Date(order.createdAt).getMonth();
            acc[month] = (acc[month] || 0) + order.amount;
            return acc;
        }, []);

        res.status(200).json({status : true  ,income});
    } catch (err) {
        res.status(500).json({ status : false , message : err});
    }
};





