// store.js
import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { productListReducer, productReducer } from "./Reducers/Product";
import {thunk} from 'redux-thunk'; // Correct import

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const rootReducer = combineReducers({
    productListReducer,
    productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) // Apply thunk middleware
);
export const persistor = persistStore(store); // Export persistor as well