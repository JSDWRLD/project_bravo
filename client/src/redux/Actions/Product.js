import axios from "axios";
import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_REQ_SUCCESS,
    PRODUCT_LIST_REQ_FAIL,
    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
} from "../Constants/Product";
import { BASE_URL } from "../Constants/BASE_URL";

export const productListAction = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQ });
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        dispatch({ type: PRODUCT_LIST_REQ_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_REQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const productAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQ });
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAIL_REQ_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_REQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

// Add a new product
export const addProduct = (productData) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST });

        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data", // Important for file uploads
                Authorization: `Bearer ${userInfo.token}`, // Include JWT token
            },
        };

        const response = await axios.post(`${BASE_URL}/api/products/add-new`, productData, config);
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Delete a product by ID
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Include JWT token
            },
        };

        await axios.delete(`${BASE_URL}/api/products/delete/${id}`, config);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id }); // Payload can be the deleted product ID
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
