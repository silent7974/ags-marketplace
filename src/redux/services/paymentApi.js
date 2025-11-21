import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    initializePayment: builder.mutation({
      query: (data) => ({
        url: "/payment/initialize",
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useInitializePaymentMutation, useVerifyPaymentMutation } =
  paymentApi;