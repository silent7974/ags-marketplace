import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    credentials: "include", // ⬅️ important for cookies
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    me: builder.query({
      query: () => "/me",
      providesTags: ["Auth"],
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useMeQuery,
  useSignoutMutation,
} = authApi;