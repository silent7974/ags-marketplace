// store/sellerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/seller" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload) => ({
        url: "/signup",
        method: "POST",
        body: payload,
      }),
    }),
    signin: builder.mutation({
      query: (payload) => ({
        url: "/signin",
        method: "POST",
        body: payload,
      }),
    }),
    getProfile: builder.query({
      query: () => "/profile",
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/profile",
        method: "PUT",
        body: payload,
      }),
    }),
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: "/profile/password",
        method: "PATCH",
        body: payload,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: "/profile",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = sellerApi;