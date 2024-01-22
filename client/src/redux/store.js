import { configureStore } from "@reduxjs/toolkit";
import { CustomerSlices } from "./slices/CustomerSlices";
import { setupListeners } from "@reduxjs/toolkit/query";
import { CustomerProfileSlice } from "./slices/CustomerProfileSlices";
import { UserSlices } from "./slices/UserSlices";

export const store = configureStore({
    reducer : {
        [CustomerSlices.reducerPath]:CustomerSlices.reducer,
        [CustomerProfileSlice.reducerPath]:CustomerProfileSlice.reducer,
        [UserSlices.reducerPath]:UserSlices.reducer
    },
    middleware : (getDefaultMiddleware)  => getDefaultMiddleware()
    .concat(CustomerSlices.middleware)
    .concat(CustomerProfileSlice.middleware)
    .concat(UserSlices.middleware)
})

setupListeners(store.dispatch);