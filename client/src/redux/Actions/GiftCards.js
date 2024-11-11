import axios from 'axios';
import {
    GIFT_CARD_CHECK_BALANCE_REQUEST,
    GIFT_CARD_CHECK_BALANCE_SUCCESS,
    GIFT_CARD_CHECK_BALANCE_FAIL,
    GIFT_CARD_RESET_BALANCE,
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
    CLEAR_GIFT_CARD_SUCCESS, // New action for clearing success state
} from '../Constants/GiftCards';
import { BASE_URL } from "../Constants/BASE_URL";

// Clear Success Action
export const clearGiftCardSuccess = () => (dispatch) => {
    dispatch({ type: CLEAR_GIFT_CARD_SUCCESS });
};

// User - Check Balance
export const checkGiftCardBalance = (code) => async (dispatch, getState) => {
    try {
        dispatch({ type: GIFT_CARD_CHECK_BALANCE_REQUEST });
        const { userLoginReducer: { userInfo } } = getState();

        const { data } = await axios.post(
            `${BASE_URL}/api/giftcards/check-balance`,
            { code },
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        
        dispatch({ type: GIFT_CARD_CHECK_BALANCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GIFT_CARD_CHECK_BALANCE_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};

export const resetGiftCardBalance = () => ({
    type: GIFT_CARD_RESET_BALANCE,
});

// User - Use Gift Card
export const useGiftCard = (code, amount) => async (dispatch, getState) => {
    try {
        dispatch({ type: GIFT_CARD_USE_REQUEST });
        const { userLoginReducer: { userInfo } } = getState();

        const { data } = await axios.post(
            `${BASE_URL}/api/giftcards/use`,
            { code, amount },
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: GIFT_CARD_USE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GIFT_CARD_USE_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};

// Admin - Get All Gift Cards
export const listGiftCards = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GIFT_CARD_LIST_REQUEST });
        const { userLoginReducer: { userInfo } } = getState();

        const { data } = await axios.get(`${BASE_URL}/api/giftcards/admin/getall`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch({ type: ADMIN_GIFT_CARD_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_GIFT_CARD_LIST_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};

// Admin - Create Gift Card
export const createGiftCard = (giftCardData) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GIFT_CARD_CREATE_REQUEST });
        const { userLoginReducer: { userInfo } } = getState();

        const { data } = await axios.post(
            `${BASE_URL}/api/giftcards/admin/create`,
            giftCardData, // Ensure this is in `{ code, balance }` format
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({ type: ADMIN_GIFT_CARD_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_GIFT_CARD_CREATE_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};

// Admin - Delete Gift Card
export const deleteGiftCard = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GIFT_CARD_DELETE_REQUEST });
        const { userLoginReducer: { userInfo } } = getState();

        await axios.delete(`${BASE_URL}/api/giftcards/admin/delete/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch({ type: ADMIN_GIFT_CARD_DELETE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: ADMIN_GIFT_CARD_DELETE_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};

// Admin - Update Gift Card Balance
export const updateGiftCardBalance = (id, amount) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GIFT_CARD_UPDATE_BALANCE_REQUEST });
        const { userLoginReducer: { userInfo } } = getState();

        const { data } = await axios.put(
            `${BASE_URL}/api/giftcards/admin/${id}/add-balance`,
            { amount },
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({ type: ADMIN_GIFT_CARD_UPDATE_BALANCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_GIFT_CARD_UPDATE_BALANCE_FAIL,
            payload: error.response?.data.message || error.message,
        });
    }
};