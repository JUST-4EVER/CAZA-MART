import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('customerToken');
}
export const paymentSlices = createApi({
    reducerPath: 'paymentSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        }
    }),
    tagTypes: ['payment'],
    endpoints: (builder) => ({

        createPayment: builder.mutation({
            query: (newPayment) => ({
                url: '/payment/checkout',
                method: 'POST',
                body: newPayment
            }),
            invalidatesTags: ['payment']
        })

    })
})


export const {
    useCreatePaymentMutation
} = paymentSlices