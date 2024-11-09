// store.js
import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { productListReducer, productReducer } from "./Reducers/Product";
import { userLoginReducer, userRegisterReducer } from "./Reducers/User";
import { cartReducer } from "./Reducers/Cart";
import { orderReducer, orderDetailReducer, orderPaymentReducer, orderListReducer, orderDeliveryReducer, adminOrderListReducer } from "./Reducers/Order";
import { giftCardCheckReducer, giftCardUseReducer, adminGiftCardListReducer } from "./Reducers/GiftCards";
import { userDeleteReducer, userDetailReducer, userListReducer, userUpdateReducer, userAddReducer } from "./Reducers/AdminUsers";
import {thunk} from 'redux-thunk'; 

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const rootReducer = combineReducers({
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer,
    cartReducer,
    orderReducer,
    orderDetailReducer,
    orderPaymentReducer,
    orderListReducer,
    orderDeliveryReducer,
    adminOrderListReducer,
    giftCardCheckReducer,
    giftCardUseReducer,
    adminGiftCardListReducer,
    userDeleteReducer,
    userDetailReducer,
    userUpdateReducer,
    userListReducer,
    userAddReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) // Apply thunk middleware
);
export const persistor = persistStore(store); // Export persistor as well