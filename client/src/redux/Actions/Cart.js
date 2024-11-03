import axios from "axios";
import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
  
    CART_SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD
} from "../Constants/Cart";
import { BASE_URL } from "../Constants/BASE_URL";

// Get method to get product data, then add item state update
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    try { 
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`)
        const firstImage = Array.isArray(data.productImage) && data.productImage.length > 0
            ? data.productImage[0]
            : '';
        // dispatch allows for our reducer to update state
        dispatch({
            type: ADD_ITEM_TO_CART,

            // Pass our payload to our reducer to update the state
            payload: {
                product: data._id,
                name: data.productName,
                image: firstImage,
                price: data.productPrice,
                countInStock: data.stockQuantity,
                qty
            }
        })

        // Get cart items from the reducer, and save the cartItems in
        // browser local storage
        const cartItems = getState().cartReducer.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        
    } catch (error) {
        console.log(error)
    }
}

// Removing from cart action to update our cart state
export const removeFromCartAction = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload:id
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems) )
}

// Updates shipping address state
export const saveShippingAddressAction = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })

    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

// Update cart state to save payment method
export const savePaymentMethodAction = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem("paymentMethod", JSON.stringify(data))
}