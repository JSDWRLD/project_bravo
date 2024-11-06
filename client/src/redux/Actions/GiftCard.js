import axios from "axios";
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
import { BASE_URL } from "../Constants/BASE_URL";
import { userLogoutAction } from "./User";

// Fetch gift card details
export const fetchGiftCardAction = (code) => async (dispatch, getState) => {
    try {
        dispatch({ type: GIFT_CARD_REQ });
        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };
        const { data } = await axios.get(`${BASE_URL}/api/giftcards/${code}`, config);
        dispatch({ type: GIFT_CARD_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: GIFT_CARD_FAIL, payload: message });
    }
};

// Redeem gift card
export const redeemGiftCardAction = (code) => async (dispatch, getState) => {
    try {
        dispatch({ type: GIFT_CARD_REDEEM_REQ });
        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };
        const { data } = await axios.put(`${BASE_URL}/api/giftcards/redeem/${code}`, {}, config);
        dispatch({ type: GIFT_CARD_REDEEM_SUCCESS, payload: data.balance });
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: GIFT_CARD_REDEEM_FAIL, payload: message });
    }
};

// Check gift card balance
export const checkGiftCardBalanceAction = (code) => async (dispatch, getState) => {
    try {
        dispatch({ type: GIFT_CARD_BALANCE_REQ });
        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };
        const { data } = await axios.get(`${BASE_URL}/api/giftcards/${code}/balance`, config);
        dispatch({ type: GIFT_CARD_BALANCE_SUCCESS, payload: data.balance });
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: GIFT_CARD_BALANCE_FAIL, payload: message });
    }
};
