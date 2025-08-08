import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sellerApi = createApi({
  reducerPath: 'sellerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/seller', // backend route for sellers
    credentials: 'include',
  }),
  tagTypes: ['Products', 'Orders', 'Profile'], // for cache invalidation
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
    // more endpoints coming...
  }),
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
} = sellerApi