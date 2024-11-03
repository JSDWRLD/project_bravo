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

// Initial state for product list
const initialProductListState = {
    products: [],
    loading: false,
    error: null,
};

// List of products reducer
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQ:
            return { loading: true, products: [] };
        case PRODUCT_LIST_REQ_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                totalPage: action.payload.totalPage,
                page: action.payload.page,
            };
        case PRODUCT_LIST_REQ_FAIL:
            return { loading: false, error: action.payload };
        case ADD_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state, // Spread the existing state to retain other properties
                loading: false,
                products: [...state.products, action.payload], // Add the new product to the list
            };
        case ADD_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: state.products.filter((product) => product._id !== action.payload), // Remove deleted product
            };
        case DELETE_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Single product by ID reducer
export const productReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQ:
            return { loading: true, ...state };
        case PRODUCT_DETAIL_REQ_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAIL_REQ_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
