const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0.0
    },
    lastUsed: {
        type: Date
    },
}, { timestamps: true });

module.exports = mongoose.model("GiftCard", giftCardSchema);
