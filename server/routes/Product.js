const express = require('express');
const AsyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const productRoute = express.Router();
const { protect, isAdmin } = require('../middleware/Auth');

require('dotenv').config();
const imgur = require('imgur');
imgur.setClientId(process.env.IMGUR_CLIENT_ID);

// Use memory storage for initial upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all products
productRoute.get(
    "/",
    AsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.json(products);
    })
);

// Fetch single product by ID
productRoute.get(
    "/:id",
    AsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error("PRODUCT NOT FOUND");
        }
    })
);

// Add New Product Route
productRoute.post(
    '/add-new',
    protect,
    isAdmin,
    upload.array('images', 4), // Allow up to 4 images
    AsyncHandler(async (req, res) => {
        const {
            productName,
            productCategory,
            productDescription,
            productPrice,
            stockQuantity,
            productRating,
            reviewCount,
        } = req.body;

        // Validate file presence
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        // Upload images to Imgur and retrieve URLs
        const productImage = await Promise.all(req.files.map(async (file) => {
            const imageBuffer = file.buffer.toString('base64'); // Convert file buffer to base64
            try {
                const response = await imgur.uploadBase64(imageBuffer);
                return response.link; // URL of the uploaded image
            } catch (error) {
                console.error('Error uploading to Imgur:', error);
                throw new Error('Image upload failed');
            }
        }));

        // Create a new Product instance
        const product = new Product({
            productName,
            productCategory,
            productImage, // Store Imgur URLs in productImage array
            productDescription,
            productPrice,
            stockQuantity,
            productRating,
            reviewCount,
        });

        // Save product to the database
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    })
);

// Delete a product by ID (protected and admin only)
productRoute.delete(
    "/delete/:id",
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: "Product removed" });
        } else {
            res.status(404);
            throw new Error("PRODUCT NOT FOUND");
        }
    })
);

// Update Product Route
productRoute.put(
    '/update/:id',
    protect,
    isAdmin,
    upload.array('images', 4), 
    AsyncHandler(async (req, res) => {
        const {
            productName,
            productCategory,
            productDescription,
            productPrice,
            stockQuantity,
            productRating,
            reviewCount,
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("PRODUCT NOT FOUND");
        }

        // If new images are provided, upload them to Imgur
        let productImage = product.productImage;
        if (req.files && req.files.length > 0) {
            productImage = await Promise.all(req.files.map(async (file) => {
                const imageBuffer = file.buffer.toString('base64');
                try {
                    const response = await imgur.uploadBase64(imageBuffer);
                    return response.link;
                } catch (error) {
                    console.error('Error uploading to Imgur:', error);
                    throw new Error('Image upload failed');
                }
            }));
        }

        // Update product fields
        product.productName = productName || product.productName;
        product.productCategory = productCategory || product.productCategory;
        product.productDescription = productDescription || product.productDescription;
        product.productPrice = productPrice || product.productPrice;
        product.stockQuantity = stockQuantity || product.stockQuantity;
        product.productRating = productRating || product.productRating;
        product.reviewCount = reviewCount || product.reviewCount;
        product.productImage = productImage;

        // Save updated product
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    })
);


// Helper function to convert category to folder name
const convertCategoryToFolderName = (category) => {
    switch (category) {
        case 'retro-games':
            return 'RetroGames';
        case 'board-games':
            return 'BoardGames';
        case 'puzzles':
            return 'Puzzles';
        case 'consoles':
            return 'Consoles';
        default:
            throw new Error('Invalid category'); // This case should never happen because of the validation above
    }
};

module.exports = productRoute;
