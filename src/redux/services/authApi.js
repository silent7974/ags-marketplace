import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
