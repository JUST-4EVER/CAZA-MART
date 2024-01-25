import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../BASE_URL';
import Cookies from 'js-cookie'
const getToken = () => {
    return Cookies.get('userToken')
}
export const userProfileSlices = createApi({
    reducerPath: 'userProfileSlices',
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
    tagTypes: ['userProfile'],
    endpoints: (builder) => ({

        createUserProfile: builder.mutation({
            query: (createUserProfile) => ({
                url: 'userProfile/add',
                method: 'POST',
                body: createUserProfile
            }),
            invalidatesTags: ['userProfile']
        }),
        updateUserProfile: builder.mutation({
            query: ({ id, updateUserProfile }) => ({
                url: `userProfile/${id}`,
                method: 'PUT',
                body: updateUserProfile
            }),
            invalidatesTags: ['userProfile']
        }),

        deleteUserProfile: builder.mutation({
            query: (id) => ({
                url: `userProfile/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['userProfile']
        }),

        getUsersProfile: builder.query({
            query: () => {
                return {
                    url: 'userProfiles',
                    method: 'GET',
                }
            },
            providesTags: ['userProfile']
        }),

        getCurrentUserProfile: builder.query({
            query: () => {
                return {
                    url: 'userProfile',
                    method: 'GET',
                }
            },
            providesTags: ['userProfile']
        })
    })
})
export const {
    useCreateUserProfileMutation,
    useUpdateUserProfileMutation,
    useDeleteUserProfileMutation,
    useGetUsersProfileQuery,
    useGetCurrentUserProfileQuery
} = userProfileSlices;