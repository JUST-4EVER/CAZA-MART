import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../BASE_URL";
import Cookies from "js-cookie";
const getToken = () => {
    return Cookies.get('userToken');
}
export const taskSlices = createApi({
    reducerPath: 'taskSlices',
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
    tagTypes: ['task'],
    endpoints: (builder) => ({

        createTask: builder.mutation({
            query: (newTask) => ({
                url: '/task/add',
                method: 'POST',
                body: newTask
            }),
            invalidatesTags: ['task']
        }),

        updateTask: builder.mutation({
            query: ({ id, updateTask }) => ({
                url: `/task/${id}`,
                method: 'PUT',
                body: updateTask
            }),
            invalidatesTags: ['task']
        }),

        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['task']
        }),

        getTasks: builder.query({
            query: () => {
                return {
                    url: '/tasks',
                    method: 'GET'
                }
            },
            providesTags: ['task']
        })

    })
})


export const {
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetTasksQuery
} = taskSlices