const { prisma } = require('../lib/lib');
exports.createOrder = async (req, res) => {
    try {
        const {
            shipping_address, payment, orderItems
        } = req.body;
        const total_amount = orderItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0)
        const customer_id = req.customerId;
        const createOrder = await prisma.orders.create({
            data: {
                customer_id: customer_id,
                shipping_address: shipping_address,
                payment: payment,
                total_amount: total_amount,
                orderItems: {
                    create: orderItems.map(orderItem => ({
                        product_id: orderItem.product_id,
                        quantity: orderItem.quantity,
                        price: orderItem.price,
                    })),
                }
            },
            include: {
                orderItems: true
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
            shipping_address, payment, order_status, orderItems
        } = req.body;
        const total_amount = orderItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0)

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
                shipping_address: shipping_address,
                payment: payment,
                total_amount: total_amount,
                order_status: order_status,
                orderItems: {
                    deleteMany: {},
                    createMany: {
                        data: orderItems
                    }
                }
            },
            include: {
                orderItems: true
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

        const getOrders = await prisma.orders.findMany({ include: { orderItems: true } });
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


exports.getOrder = async (req, res) => {
    try {

        const id = req.params.id;
        const getOrder = await prisma.orders.findUnique(
            {
                where: {
                    id: id
                },
                include: {
                    orderItems: true
                }
            }
        );
        if (!getOrder) {
            return res.json({
                status: false,
                message: 'No order found'
            })
        }
        return res.json({
            status: true,
            getOrder
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
                where : {
                    id : id
                }
            }
        );
        if (!existingOrder) {
            return res.json({
                status: false,
                message: 'order does not exist'
            })
        }
        const deleteOrderItems = await prisma.orderItems.deleteMany({ where: { order_id: id }});
        if (!deleteOrderItems) {
            return res.json({
                status: false,
                message: 'orderItems failed to delete'
            })
        }
        const deleteOrder = await prisma.orders.delete({
            where : {
                id : id
            }
        })
        if(!deleteOrder){
            return res.json({
                status : false,
                message : 'Order failed to delete'
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


