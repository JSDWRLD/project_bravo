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

// Reducer for listing all users
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ADMIN_USER_LIST_REQ:
            return { loading: true };
        case ADMIN_USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case ADMIN_USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for user details
export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADMIN_USER_DETAIL_REQ:
            return { loading: true };
        case ADMIN_USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload };
        case ADMIN_USER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for updating a user
export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_USER_UPDATE_REQ:
            return { loading: true };
        case ADMIN_USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case ADMIN_USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for deleting a user
export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_USER_DELETE_REQ:
            return { loading: true };
        case ADMIN_USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ADMIN_USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userAddReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_USER_ADD_REQ:
            return { loading: true };
        case ADMIN_USER_ADD_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case ADMIN_USER_ADD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};