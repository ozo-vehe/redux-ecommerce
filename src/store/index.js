import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    users: usersReducer,
    products: productsReducer,
  },
});