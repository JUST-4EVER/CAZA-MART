import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const productSlices = createApi({
    reducerPath: 'productSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['product'],
    endpoints: (builder) => ({

        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/product/add',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['product']
        }),

        updateProduct: builder.mutation({
            query: ({ id, updateProduct }) => ({
                url: `/product/${id}`,
                method: 'PUT',
                body: updateProduct
            }),
            invalidatesTags: ['product']
        }),

        deleteProduct : builder.mutation({
            query : (id) => ({
                url : `/product/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['product']
        }),

        getProducts : builder.query({
            query : () => {
                return {
                    url : '/products',
                    method : 'GET'
                }
            },
            providesTags : ['product']
        })

    })
})


export const  {
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation
} = productSlices