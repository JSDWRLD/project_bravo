import {
    GIFT_CARD_REQ,
    GIFT_CARD_SUCCESS,
    GIFT_CARD_FAIL,
    GIFT_CARD_REDEEM_REQ,
    GIFT_CARD_REDEEM_SUCCESS,
    GIFT_CARD_REDEEM_FAIL,
    GIFT_CARD_BALANCE_REQ,
    GIFT_CARD_BALANCE_SUCCESS,
    GIFT_CARD_BALANCE_FAIL
} from "../Constants/GiftCard";

// Fetch Gift Card
export const giftCardReducer = (state = {}, action) => {
    switch (action.type) {
        case GIFT_CARD_REQ:
            return { loading: true };
        case GIFT_CARD_SUCCESS:
            return { loading: false, success: true, giftCard: action.payload };
        case GIFT_CARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Redeem Gift Card
export const giftCardRedeemReducer = (state = {}, action) => {
    switch (action.type) {
        case GIFT_CARD_REDEEM_REQ:
            return { loading: true };
        case GIFT_CARD_REDEEM_SUCCESS:
            return { loading: false, success: true, balance: action.payload };
        case GIFT_CARD_REDEEM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Check Gift Card Balance
export const giftCardBalanceReducer = (state = { balance: null }, action) => {
    switch (action.type) {
        case GIFT_CARD_BALANCE_REQ:
            return { loading: true };
        case GIFT_CARD_BALANCE_SUCCESS:
            return { loading: false, balance: action.payload };
        case GIFT_CARD_BALANCE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
