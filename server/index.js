// Store express in app
const express = require("express");
const app = express();

// Allows for access of environment variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT
const products = require("./data/Products")

const cors = require("cors");

const mongoose = require("mongoose")

// Connect with DB
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("DB Connected!")).then((err) => {
    err;
})

const databaseSeeder = require('./databaseSeeder');
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

app.use(express.json());
app.use(cors());
// Database, which db
app.use('/api/seed', databaseSeeder);
// User Route, called using /login
app.use('/api/users', userRoute);
// Product Route
app.use('/api/products', productRoute);
// Order Route
app.use('/api/orders', orderRoute);

app.listen(PORT || 5000, () => {
    console.log(`server listening on port ${PORT}`);
});

// Paypal Payment Client ID from ENV for frontend
app.use("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})



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