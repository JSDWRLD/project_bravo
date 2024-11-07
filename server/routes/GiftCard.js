const express = require("express");
const AsyncHandler = require("express-async-handler");
const GiftCard = require("../models/GiftCard");
const { protect, isAdmin } = require("../middleware/Auth");

const giftCardRoute = express.Router();

// Admin - Create a new gift card
giftCardRoute.post(
    "/admin/create",
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const { code, balance } = req.body;
        
        const giftCardExists = await GiftCard.findOne({ code });
        if (giftCardExists) {
            res.status(400);
            throw new Error("Gift card code already exists.");
        }

        const giftCard = new GiftCard({ code, balance });
        const createdGiftCard = await giftCard.save();
        res.status(201).json(createdGiftCard);
    })
);

// Admin - Delete a gift card
giftCardRoute.delete(
    "/admin/delete/:id",
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const giftCard = await GiftCard.findById(req.params.id);
        if (giftCard) {
            // Replace remove() with deleteOne()
            await giftCard.deleteOne();
            res.status(200).json({ message: "Gift card deleted successfully" });
        } else {
            res.status(404);
            throw new Error("Gift card not found");
        }
    })
);

// Admin - Add balance to a gift card
giftCardRoute.put(
    "/admin/:id/add-balance",
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const { amount } = req.body;
        const giftCard = await GiftCard.findById(req.params.id);
        
        if (giftCard) {
            giftCard.balance += amount;
            const updatedGiftCard = await giftCard.save();
            res.status(200).json(updatedGiftCard);
        } else {
            res.status(404);
            throw new Error("Gift card not found");
        }
    })
);

// Admin - Get all gift cards
giftCardRoute.get(
    "/admin/getall",
    protect,
    isAdmin,
    AsyncHandler(async (req, res) => {
        const giftcards = await GiftCard.find({});
        res.json(giftcards);
    })
)

// User - Use gift card as payment method
giftCardRoute.post(
    "/use",
    protect,
    AsyncHandler(async (req, res) => {
        const { code, amount } = req.body;
        const giftCard = await GiftCard.findOne({ code });

        if (giftCard) {
            if (giftCard.balance >= amount) {
                giftCard.balance -= amount;
                giftCard.lastUsed = Date.now();
                const updatedGiftCard = await giftCard.save();
                res.status(200).json({
                    message: "Gift card used successfully",
                    updatedBalance: updatedGiftCard.balance
                });
            } else {
                res.status(400);
                throw new Error("Insufficient balance on gift card");
            }
        } else {
            res.status(404);
            throw new Error("Gift card not found");
        }
    })
);

module.exports = giftCardRoute;
