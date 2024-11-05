import axios from "axios";
import {
    ORDER_REQ,
    ORDER_SUCCESS,

    ORDER_DETAIL_REQ,
    ORDER_DETAIL_REQ_FAIL,
    ORDER_DETAIL_REQ_SUCCESS,

    ORDER_PAYMENT_REQ,
    ORDER_PAYMENT_REQ_FAIL,
    ORDER_PAYMENT_REQ_SUCCESS,

    ORDER_LIST_REQ,
    ORDER_LIST_REQ_FAIL,
    ORDER_LIST_REQ_SUCCESS,

    ORDER_DELIVERY_REQ,
    ORDER_DELIVERY_SUCCESS,
    ORDER_DELIVERY_FAIL,

    ADMIN_ORDER_LIST_REQ,
    ADMIN_ORDER_LIST_SUCCESS,
    ADMIN_ORDER_LIST_FAIL
} from "../Constants/Order"
import { BASE_URL } from "../Constants/BASE_URL";

import { CART_ITEM_CLEAR } from "../Constants/Cart"
import { userLogoutAction } from "./User";

// Post an order based on the user information and the information about the order
export const orderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_REQ })
        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.post(
            `${BASE_URL}/api/orders`,
            order,
            config
        );
        
        dispatch({ type: ORDER_SUCCESS, payload: data });
        dispatch({ type: CART_ITEM_CLEAR, payload: data });
    } catch (error) {
        console.log(error)
    }
}

// Order payment action to update payment details and isPaid state
export const orderPaymentAction =
    (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_PAYMENT_REQ });
            const userInfo = getState().userLoginReducer.userInfo;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.put(
                `${BASE_URL}/api/orders/${orderId}/payment`,
                paymentResult,
                config
            );

            dispatch({ type: ORDER_PAYMENT_REQ_SUCCESS, payload: data });
            dispatch(orderDetailAction(orderId))

        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;

            if (message === "Not authroized!") {
                dispatch(userLogoutAction());
            }
            dispatch({
                type: ORDER_PAYMENT_REQ_FAIL,
                payload: message,
            });
        }
    };


// Get's details about a specific order based on the specific item id
export const orderDetailAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQ });
        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${BASE_URL}/api/orders/${id}`,

            config
        );
        dispatch({ type: ORDER_DETAIL_REQ_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authroized!") {
            dispatch(userLogoutAction());
        }
        dispatch({
            type: ORDER_DETAIL_REQ_FAIL,
            payload: message,
        });
    }
};


// Get Order List based on user that is currently logged in
export const orderListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQ });
        const userInfo = getState().userLoginReducer.userInfo;

        const config = {
            headers: {

                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${BASE_URL}/api/orders`,
            config
        );
        dispatch({ type: ORDER_LIST_REQ_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authroized!") {
            dispatch(userLogoutAction());
        }
        dispatch({
            type: ORDER_LIST_REQ_FAIL,
            payload: message,
        });
    }
};

// Action to update the delivery status of an order
export const orderDeliveryAction = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVERY_REQ });
        const userInfo = getState().userLoginReducer.userInfo;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Payload for the request body
        const payload = {
            isDelivered: true,
        };

        // Send the payload with the request
        const { data } = await axios.put(
            `${BASE_URL}/api/orders/${orderId}/delivery`,
            payload,
            config
        );

        dispatch({ type: ORDER_DELIVERY_SUCCESS, payload: data });
        dispatch(adminOrderListAction());
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authorized!") {
            dispatch(userLogoutAction());
        }
        dispatch({
            type: ORDER_DELIVERY_FAIL,
            payload: message,
        });
    }
};


// Action to get all orders for admin view
export const adminOrderListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_ORDER_LIST_REQ });
        const userInfo = getState().userLoginReducer.userInfo;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${BASE_URL}/api/orders/admin/vieworders`, config);
        dispatch({ type: ADMIN_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;

        if (message === "Not authorized!") {
            dispatch(userLogoutAction());
        }
        dispatch({ type: ADMIN_ORDER_LIST_FAIL, payload: message });
    }
};
