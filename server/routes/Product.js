const express = require('express');
const AsyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const productRoute = express.Router();

productRoute.get(
    "/", 
    AsyncHandler(async(req, res) => {
        const products = await Product.find({});
        res.json(products)
    })
);

// Fetch single product
productRoute.get(
    "/:id",
    AsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product)
        } else {
            res.status(404);
            throw new Error("PRODUCT NOT FOUND");
        }
    })
)

module.exports = productRoute