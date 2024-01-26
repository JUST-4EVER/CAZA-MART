import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";

export const reviewSlices = createApi({
    reducerPath: 'reviewSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ['review'],
    endpoints: (builder) => ({

        createReview: builder.mutation({
            query: (newReview) => ({
                url: '/review/add',
                method: 'POST',
                body: newReview
            }),
            invalidatesTags: ['review']
        }),

        updateReview: builder.mutation({
            query: ({ id, updateReview }) => ({
                url: `/review/${id}`,
                method: 'PUT',
                body: updateReview
            }),
            invalidatesTags: ['review']
        }),

        deleteReview : builder.mutation({
            query : (id) => ({
                url : `/review/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['review']
        }),

        getReviews : builder.query({
            query : () => {
                return {
                    url : '/reviews',
                    method : 'GET'
                }
            },
            providesTags : ['review']
        })

    })
})


export const  {
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetReviewsQuery
} = reviewSlices;