// Store express in app
const express = require("express");
const app = express();

// Allows for access of environment variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT
const products = require("./data/Products")

const mongoose = require("mongoose")

// Connect with DB
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("DB Connected!")).then((err) => {
    err;
})

app.listen(PORT || 5000, () => {
    console.log(`server listening on port ${PORT}`);
});






// API Product Test route
/* 
app.get("/server/products", (req, res) => {
    res.json(products);
});

// Test single item api request
app.get("/server/products/:id", (req, res) => {
    const product = products.find((product) => product.id == req.params.id)
    res.json(product);
});
 */