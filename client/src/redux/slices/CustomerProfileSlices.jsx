import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../BASE_URL';
import Cookies from 'js-cookie'
const getToken = () => {
    return Cookies.get('customerToken')
}
export const CustomerProfileSlice = createApi({
    reducerPath: 'CustomerProfile',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders : (headers) => {
            const token = getToken();
            if(token){
                headers.set('authorization',token);
            }
            return headers;
        }
    }),
    tagTypes: ['customerProfile'],
    endpoints: (builder) => ({

        registerCustomerProfile: builder.mutation({
            query: (creatCustomerProfile) => (
                console.log(creatCustomerProfile),{
                url: 'customerProfile/add',
                method: 'POST',
                body: creatCustomerProfile
            }),
            invalidatesTags: ['customerProfile']
        }),
        updateCustomerProfile : builder.mutation({
            query: ({ id, updateCustomerProfile }) => ({
                url: `customerProfile/${id}`,
                method: 'PUT',
                body: updateCustomerProfile
            }),
            invalidatesTags: ['customerProfile']
        }),

        deleteCustomerProfile: builder.mutation({
            query: (id) => ({
                url: `customerProfile/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['customerProfile']
        }),

        getCustomersProfile : builder.query({
            query : () => {
                return {
                    url : 'customerProfiles',
                    method : 'GET',
                }
            },
            providesTags : ['customerProfile']
        }),

        getCurrentCustomerProfile : builder.query({
            query : () => {
                return {
                    url : 'customerProfile',
                    method : 'GET',
                }
            },
            providesTags : ['customerProfile']
        })
    })
})

// eslint-disable-next-line react-refresh/only-export-components
export const {
    useRegisterCustomerProfileMutation,
    useUpdateCustomerProfileMutation,
    useDeleteCustomerProfileMutation,
    useGetCustomersProfileQuery,
    useGetCurrentCustomerProfileQuery
} = CustomerProfileSlice;