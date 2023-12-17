import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../BASE_URL';
import Cookies from 'js-cookie'
const setToken = (token) => {
    Cookies.set('customerToken', token)
}
const getToken = () => {
    return Cookies.get('customerToken')
}
export const CustomerSlices = createApi({
    reducerPath: 'customerSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders : (headers) => {
            const token = getToken();
            if(token){
                headers.set('Authorization',token);
            }
            return headers;
        }
    }),
    tagTypes: ['customer'],
    endpoints: (builder) => ({

        registerCustomer: builder.mutation({
            query: (newCustomer) => ({
                url: 'customer/register',
                method: 'POST',
                body: newCustomer
            }),
            invalidatesTags: ['customer']
        }),

        ChangeCustomerPassword: builder.mutation({
            query: (CustomerPassword) => ({
                url: 'customer/changePassword',
                method: 'POST',
                body: CustomerPassword
            }),
            invalidatesTags: ['customer']
        }),

        loginCustomer: builder.mutation({
            query: (loginCustomer) => ({
                url: 'customer/login',
                method: 'POST',
                body: loginCustomer
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                try {
                    const token = await queryFulfilled;
                    if (token) {
                        setToken(token?.data?.customerToken);
                        console.log('token data', token.data.customerToken);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: ['customer'],
        }),

        updateCustomer: builder.mutation({
            query: ({ id, updateCustomer }) => ({
                url: `customer/${id}`,
                method: 'PUT',
                body: updateCustomer
            }),
            invalidatesTags: ['customer']
        }),

        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `customer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['customer']
        }),

        getCustomers : builder.query({
            query : () => {
                return {
                    url : 'customers',
                    method : 'GET',
                }
            },
            providesTags : ['customer']
        }),

        getCurrentCustomer : builder.query({
            query : () => {
                return {
                    url : 'customer/current',
                    method : 'GET',
                }
            },
            providesTags : ['customer']
        })
    })
})

// eslint-disable-next-line react-refresh/only-export-components
export const {
    useRegisterCustomerMutation,
    useLoginCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useGetCurrentCustomerQuery,
    useGetCustomersQuery,
    useChangeCustomerPasswordMutation
} = CustomerSlices