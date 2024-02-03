import { configureStore } from "@reduxjs/toolkit";
import { CustomerSlices } from "./slices/CustomerSlices";
import { setupListeners } from "@reduxjs/toolkit/query";
import { CustomerProfileSlice } from "./slices/CustomerProfileSlices";
import { UserSlices } from "./slices/UserSlices";
import { productSlices } from "./slices/ProductSlices";
import { categorySlices } from "./slices/CategorySlices";
import { userProfileSlices } from "./slices/UserProfileSlices";
import { reviewSlices } from "./slices/ReviewSlices";
import cartSlices from "./toolkit/slices/cartSlices";
import { taskSlices } from "./slices/TaskSlices";
import { paymentSlices } from "./slices/PaymentSlices";
import { orderSlices } from "./slices/orderSlices";

export const store = configureStore({
    reducer: {
        [CustomerSlices.reducerPath]: CustomerSlices.reducer,
        [CustomerProfileSlice.reducerPath]: CustomerProfileSlice.reducer,
        [UserSlices.reducerPath]: UserSlices.reducer,
        [productSlices.reducerPath]: productSlices.reducer,
        [categorySlices.reducerPath]: categorySlices.reducer,
        [userProfileSlices.reducerPath]: userProfileSlices.reducer,
        [reviewSlices.reducerPath]: reviewSlices.reducer,
        [taskSlices.reducerPath]: taskSlices.reducer,
        [paymentSlices.reducerPath]: paymentSlices.reducer,
        [orderSlices.reducerPath]: orderSlices.reducer,
        cart: cartSlices,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(CustomerSlices.middleware)
        .concat(CustomerProfileSlice.middleware)
        .concat(UserSlices.middleware)
        .concat(productSlices.middleware)
        .concat(categorySlices.middleware)
        .concat(userProfileSlices.middleware)
        .concat(reviewSlices.middleware)
        .concat(taskSlices.middleware)
        .concat(paymentSlices.middleware)
        .concat(orderSlices.middleware)
})

setupListeners(store.dispatch);