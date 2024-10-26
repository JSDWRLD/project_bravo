const express = require('express');
const AsyncHandler = require('express-async-handler');
const protect = require('../middleware/Auth');
const Order = require('../models/Order');
const { findById } = require('../models/User');
const orderRoute = express.Router();

orderRoute.post(
    '/',
    protect,
    AsyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            taxPrice,
            totalPrice,
            itemPrice,
        } = req.body

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('NO ORDER ITEMS FOUND');
        } else {
            const order = new Order({
                orderItems,
                shippingAddress,
                paymentMethod,
                shippingPrice,
                taxPrice,
                totalPrice,
                itemPrice,
                user: req.user._id
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    })
);

// Update Order Payment Status
orderRoute.put(
    '/:id/payment',
    protect,
    AsyncHandler(async(req, res) => {
        const orderToUpdate = await Order.findById(req.params.id);

        if (orderToUpdate) {
            orderToUpdate.isPaid = true;
            orderToUpdate.paidAt = Date.now();
            orderToUpdate.paymentResult = {
                order_id: req.body.order_id,
                status: req.body.status,
                updated_time: req.body.updated_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await orderToUpdate.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404);
            throw new Error("ORDER NOT FOUND")
        }
    })
);

// Get By Specific User, for detailed page
orderRoute.get(
    '/',
    protect,
    AsyncHandler(async(req, res) => {
        const orders = await Order.find({user:req.user._id}).sort({_id:-1});
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404);
            throw new Error("ORDERS NOT FOUND");
        }
    })
);

// Get one order by ID
orderRoute.get(
    '/:id',
    protect,
    AsyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id).populate("user", "email");
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404);
            throw new Error("NO ORDER FOUND");
        }
    })
);

module.exports = orderRoute;

