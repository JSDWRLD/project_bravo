const express = require('express');
const AsyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs'); // Require the fs module
const path = require('path'); // Require the path module
const Product = require('../models/Product');
const productRoute = express.Router();
const { protect, isAdmin } = require('../middleware/Auth');

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

productRoute.post(
    '/add-new',
    protect,
    isAdmin,
    upload.array('images', 4), // Expecting up to 4 images
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

        // Validate product category
        const validCategories = ['retro-games', 'board-games', 'puzzles', 'consoles'];
        if (!validCategories.includes(productCategory)) {
            return res.status(400).json({ message: 'Invalid product category.' });
        }

        // Check if files are present
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        // Create the directory based on productCategory
        const dir = path.join(__dirname, '..', '..', 'client', 'public', 'assets', convertCategoryToFolderName(productCategory));
        
        console.log(`Creating directory: ${dir}`);
        // Ensure the directory exists
        fs.mkdirSync(dir, { recursive: true });

        // Move files from memory storage to disk and create paths for product images
        const productImage = await Promise.all(req.files.map(file => {
            const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2, 15);
            const filename = `${uniqueSuffix}-${file.originalname}`;
            const filePath = path.join(dir, filename);

            // Write file to disk
            try {
                fs.writeFileSync(filePath, file.buffer);
                console.log("File saved successfully: ", filename);
            } catch (error) {
                console.error(`Error writing file ${filename}:`, error);
                return res.status(500).json({ message: 'Error saving file.' });
            }

            // Return the path to be stored in the database
            return `/assets/${convertCategoryToFolderName(productCategory)}/${filename}`;
        }));

        const product = new Product({
            productName,
            productCategory,
            productImage,
            productDescription,
            productPrice,
            stockQuantity,
            productRating,
            reviewCount,
        });

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
            await Product.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
            res.json({ message: "Product removed" });
        } else {
            res.status(404);
            throw new Error("PRODUCT NOT FOUND");
        }
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
