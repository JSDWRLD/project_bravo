const express = require('express');
const AsyncHandler = require('express-async-handler');
const protect = require('../middleware/Auth');
const Order = require('../models/Order');
const orderRoute = express.Router();

orderRoute.post(
    "/",
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

module.exports = orderRoute;

