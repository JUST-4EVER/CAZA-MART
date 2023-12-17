import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";
import Cookies from "js-cookie";
const setToken = (token) => {
    Cookies.set('UserToken',token);
}
const getToken = () => {
    return Cookies.get('userToken');
}
export const UserSlices = createApi({
    reducerPath : 'users',
    baseQuery : fetchBaseQuery({
        baseUrl : BASE_URL,
        prepareHeaders : (headers) => {
            const token = getToken();
            if(token){
                headers.set('Authorization',token);
            }
            return headers;
        }
    }),
    tagTypes : ['user'],
    endpoints : (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: 'user/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['user']
        }),


        loginUser: builder.mutation({
            query: (loginUser) => ({
                url: 'user/login',
                method: 'POST',
                body: loginUser
            }),
            onQueryStarted : async (args , {queryFulfilled}) => {
                try {
                    const token = await queryFulfilled;
                    if(token){
                        setToken(token.data);
                        console.log('userToken',token.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            ,
            invalidatesTags: ['user']
        }),


        updateUser: builder.mutation({
            query: ({id , updateUser}) => ({
                url: `user/${id}`,
                method: 'PUT',
                body: updateUser
            }),
            invalidatesTags: ['user']
        }),


        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['user']
        }),


        getUsers : builder.query({
            query : () => {
                return {
                    url : 'users',
                    method : 'GET',
                }
            },
            providesTags : ['user']
        }),

        getCurrentUser : builder.query({
            query : () => {
                return {
                    url : 'user/current',
                    method : 'GET',
                }
            },
            providesTags : ['user']
        })
    })
}) 