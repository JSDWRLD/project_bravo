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
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    PRODUCT_STOCK_UPDATE_REQUEST,
    PRODUCT_STOCK_UPDATE_SUCCESS,
    PRODUCT_STOCK_UPDATE_FAIL,
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

export const updateProduct = (id, updatedProductData) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`${BASE_URL}/api/products/update/${id}`, updatedProductData, config);
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
        return data;  // Return data for chaining
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
        throw error;  // Throw error to catch in the component
    }
};

export const updateStockAction = (productId, newStock) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_STOCK_UPDATE_REQUEST });

        const userInfo = getState().userLoginReducer.userInfo;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `${BASE_URL}/api/products/update/${productId}`,
            { stockQuantity: newStock },
            config
        );

        dispatch({ type: PRODUCT_STOCK_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_STOCK_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};