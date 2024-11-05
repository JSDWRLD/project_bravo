import {
    ORDER_REQ,
    ORDER_RESET,
    ORDER_SUCCESS,
    ORDER_FAIL,

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

// Reducers are event listeners where depnding on the server response
// will update the application state

// Order Creation
export const orderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_REQ:
            return { loading: true };
        case ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_RESET:
            return {}
        default:
            return state;
        
    }
}

export const orderDetailReducer = (state = { loading: true, shippingAddress: {}, orderItems: [] }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQ:
            return { loading: true };
        case ORDER_DETAIL_REQ_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_DETAIL_REQ_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;

    }
};

export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAYMENT_REQ:
            return { loading: true };
        case ORDER_PAYMENT_REQ_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_PAYMENT_REQ_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;

    }
};

export const orderListReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQ:
            return { loading: true };
        case ORDER_LIST_REQ_SUCCESS:
            return { loading: false, success: true, orders: action.payload };
        case ORDER_LIST_REQ_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;

    }
};

// Order Delivery Status Update Reducer
export const orderDeliveryReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVERY_REQ:
            return { loading: true };
        case ORDER_DELIVERY_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_DELIVERY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const adminOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_ORDER_LIST_REQ:
            return { loading: true, orders: [] }; // Reset orders on request
        case ADMIN_ORDER_LIST_SUCCESS:
            return { loading: false, success: true, orders: action.payload }; // Update orders
        case ADMIN_ORDER_LIST_FAIL:
            return { loading: false, error: action.payload, orders: [] }; // Optionally reset orders on failure
        default:
            return state;
    }
};
