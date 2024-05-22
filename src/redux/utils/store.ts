import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/newProduct/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/newCart/cartSlice";
import categoryReducer from "../features/category/categorySlice";
import slideReducer from "../features/slider/sliderSlice";

// TODO: Store all the states
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
    slider: slideReducer,
  },
});

// TODO: Type of all the states I have in the current project
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
