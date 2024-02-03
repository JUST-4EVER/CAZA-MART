import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('customerToken');
}
export const orderSlices = createApi({
    reducerPath: 'orderSlices',
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
    tagTypes: ['order'],
    endpoints: (builder) => ({

        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/order/add',
                method: 'POST',
                body: newOrder
            }),
            invalidatesTags: ['order']
        }),

        updateOrder: builder.mutation({
            query: ({ id, updateOrder }) => ({
                url: `/order/${id}`,
                method: 'PUT',
                body: updateOrder
            }),
            invalidatesTags: ['order']
        }),

        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['order']
        }),

        getOrders: builder.query({
            query: () => {
                return {
                    url: '/orders',
                    method: 'GET'
                }
            },
            providesTags: ['order']
        }),
        getCustomerOrder: builder.query({
            query: () => {
                return {
                    url: '/order',
                    method: 'GET'
                }
            },
            providesTags: ['order']
        })

    })
})


export const {
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetOrdersQuery,
    useGetCustomerOrderQuery
} = orderSlices