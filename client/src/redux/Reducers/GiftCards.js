import {
    GIFT_CARD_CHECK_BALANCE_REQUEST,
    GIFT_CARD_CHECK_BALANCE_SUCCESS,
    GIFT_CARD_CHECK_BALANCE_FAIL,
    GIFT_CARD_USE_REQUEST,
    GIFT_CARD_USE_SUCCESS,
    GIFT_CARD_USE_FAIL,
    ADMIN_GIFT_CARD_LIST_REQUEST,
    ADMIN_GIFT_CARD_LIST_SUCCESS,
    ADMIN_GIFT_CARD_LIST_FAIL,
    ADMIN_GIFT_CARD_CREATE_REQUEST,
    ADMIN_GIFT_CARD_CREATE_SUCCESS,
    ADMIN_GIFT_CARD_CREATE_FAIL,
    ADMIN_GIFT_CARD_DELETE_REQUEST,
    ADMIN_GIFT_CARD_DELETE_SUCCESS,
    ADMIN_GIFT_CARD_DELETE_FAIL,
    ADMIN_GIFT_CARD_UPDATE_BALANCE_REQUEST,
    ADMIN_GIFT_CARD_UPDATE_BALANCE_SUCCESS,
    ADMIN_GIFT_CARD_UPDATE_BALANCE_FAIL,
} from '../Constants/GiftCards';

// User - Check Gift Card Balance
export const giftCardCheckReducer = (state = { balanceInfo: {} }, action) => {
    switch (action.type) {
        case GIFT_CARD_CHECK_BALANCE_REQUEST:
            return { loading: true };
        case GIFT_CARD_CHECK_BALANCE_SUCCESS:
            return { loading: false, balanceInfo: action.payload };
        case GIFT_CARD_CHECK_BALANCE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// User - Use Gift Card
export const giftCardUseReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case GIFT_CARD_USE_REQUEST:
            return { loading: true };
        case GIFT_CARD_USE_SUCCESS:
            return { loading: false, success: true, updatedBalance: action.payload.updatedBalance };
        case GIFT_CARD_USE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Admin - List All Gift Cards and Track Success for Other Actions
export const adminGiftCardListReducer = (state = { giftCards: [], success: false }, action) => {
    switch (action.type) {
        case ADMIN_GIFT_CARD_LIST_REQUEST:
            return { ...state, loading: true, success: false };
        case ADMIN_GIFT_CARD_LIST_SUCCESS:
            return { loading: false, giftCards: action.payload, success: false };
        case ADMIN_GIFT_CARD_LIST_FAIL:
            return { loading: false, error: action.payload, success: false };
        
        // Handling create, delete, and update balance in one reducer to centralize success tracking
        case ADMIN_GIFT_CARD_CREATE_REQUEST:
        case ADMIN_GIFT_CARD_DELETE_REQUEST:
        case ADMIN_GIFT_CARD_UPDATE_BALANCE_REQUEST:
            return { ...state, loading: true };
        case ADMIN_GIFT_CARD_CREATE_SUCCESS:
        case ADMIN_GIFT_CARD_DELETE_SUCCESS:
        case ADMIN_GIFT_CARD_UPDATE_BALANCE_SUCCESS:
            return { ...state, loading: false, success: true };
        case ADMIN_GIFT_CARD_CREATE_FAIL:
        case ADMIN_GIFT_CARD_DELETE_FAIL:
        case ADMIN_GIFT_CARD_UPDATE_BALANCE_FAIL:
            return { ...state, loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};
