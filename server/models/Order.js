const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    displayImage: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: [ 'paypal', 'gift' ]
    },
    paymentResult: {
        order_id: {
            type: String
        },
        status: {
            type: String
        },
        updated_time: {
            type: String
        },
        email_address: {
            type: String
        },
        payment_method: {
            type: String
        },
        gift_card_code: {
            type: String
        },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)

