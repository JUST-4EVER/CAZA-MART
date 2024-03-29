import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('userToken');
}
export const categorySlices = createApi({
    reducerPath: 'categorySlices',
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
    tagTypes: ['category'],
    endpoints: (builder) => ({

        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/category/add',
                method: 'POST',
                body: newCategory
            }),
            invalidatesTags: ['category']
        }),

        updateCategory: builder.mutation({
            query: ({ id, updateCategory }) => ({
                url: `/category/${id}`,
                method: 'PUT',
                body: updateCategory
            }),
            invalidatesTags: ['category']
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['category']
        }),

        getCategories: builder.query({
            query: () => {
                return {
                    url: '/categories',
                    method: 'GET'
                }
            },
            providesTags: ['category']
        })

    })
})


export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery
} = categorySlices;