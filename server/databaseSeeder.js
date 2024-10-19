const AsyncHandler = require('express-async-handler')

const router = require('express').Router();
const User = require('./models/User');
const userAccounts = require('./data/Users')
const Product = require('./models/Product');
const products = require('./data/Products')


router.post('/users', AsyncHandler(
    async(req, res) => {
        await User.deleteMany({});
        const UserSeeder = await User.insertMany(userAccounts)
        res.send({ UserSeeder })
    }
));

router.post('/products', AsyncHandler(
    async(req, res) => {
        await Product.deleteMany({});
        const ProductSeeder = await Product.insertMany(products)
        res.send({ ProductSeeder })
    }
));

module.exports = router;