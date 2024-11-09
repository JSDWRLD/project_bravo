import axios from "axios";
import {
    ADMIN_USER_LIST_REQ,
    ADMIN_USER_LIST_SUCCESS,
    ADMIN_USER_LIST_FAIL,

    ADMIN_USER_DETAIL_REQ,
    ADMIN_USER_DETAIL_SUCCESS,
    ADMIN_USER_DETAIL_FAIL,

    ADMIN_USER_UPDATE_REQ,
    ADMIN_USER_UPDATE_SUCCESS,
    ADMIN_USER_UPDATE_FAIL,

    ADMIN_USER_DELETE_REQ,
    ADMIN_USER_DELETE_SUCCESS,
    ADMIN_USER_DELETE_FAIL,

    ADMIN_USER_ADD_REQ,
    ADMIN_USER_ADD_SUCCESS,
    ADMIN_USER_ADD_FAIL,
} from "../Constants/AdminUsers";
import { BASE_URL } from "../Constants/BASE_URL";
import { userLogoutAction } from "./User";

// Fetch all users (Admin)
export const listUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_LIST_REQ });
        const { userInfo } = getState().userLoginReducer;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${BASE_URL}/api/users/admin/users`, config);
        dispatch({ type: ADMIN_USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: ADMIN_USER_LIST_FAIL, payload: message });
    }
};

// Fetch user details by ID (Admin)
export const getUserDetailAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_DETAIL_REQ });
        const { userInfo } = getState().userLoginReducer;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${BASE_URL}/api/users/admin/user/${id}`, config);
        dispatch({ type: ADMIN_USER_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: ADMIN_USER_DETAIL_FAIL, payload: message });
    }
};

// Update user details (Admin)
export const updateUserAction = (id, userData) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_UPDATE_REQ });
        const { userInfo } = getState().userLoginReducer;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.put(`${BASE_URL}/api/users/admin/user/${id}`, userData, config);
        dispatch({ type: ADMIN_USER_UPDATE_SUCCESS });
        dispatch(listUsersAction()); // Refresh user list
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: ADMIN_USER_UPDATE_FAIL, payload: message });
    }
};

// Delete a user (Admin)
export const deleteUserAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_DELETE_REQ });
        const { userInfo } = getState().userLoginReducer;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${BASE_URL}/api/users/admin/user/${id}`, config);
        dispatch({ type: ADMIN_USER_DELETE_SUCCESS });
        dispatch(listUsersAction()); // Refresh user list
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: ADMIN_USER_DELETE_FAIL, payload: message });
    }
};

// Action to add a new user (Admin)
export const addUserAction = (userData) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_USER_ADD_REQ });
        const { userInfo } = getState().userLoginReducer;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${BASE_URL}/api/users/admin/add`, userData, config);
        dispatch({ type: ADMIN_USER_ADD_SUCCESS, payload: data });
        dispatch(listUsersAction()); // Refresh user list after adding a new user
    } catch (error) {
        const message = error.response?.data.message || error.message;
        if (message === "Not authorized!") dispatch(userLogoutAction());
        dispatch({ type: ADMIN_USER_ADD_FAIL, payload: message });
    }
};

