// src/redux/services/buyerApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// RTK Query service for all buyer-side requests
export const buyerApi = createApi({
  reducerPath: 'buyerApi', // name in Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/buyer', // all buyer endpoints start here
    credentials: 'include', // sends cookies/tokens automatically
  }),
  tagTypes: ['Products', 'Cart', 'Orders'], // for auto-refetch when data changes
  endpoints: (builder) => ({
    
    // ✅ Get all products
    getProducts: builder.query({
      query: () => '/products', // GET /api/buyer/products
      providesTags: ['Products'],
    }),

    // ✅ Get single product details
    getProductDetails: builder.query({
      query: (productId) => `/products/${productId}`, // GET /api/buyer/products/:id
      providesTags: ['Products'],
    }),

    // ✅ Add item to cart
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: '/cart', // POST /api/buyer/cart
        method: 'POST',
        body: cartData,
      }),
      invalidatesTags: ['Cart'],
    }),

    // ✅ Get cart items
    getCart: builder.query({
      query: () => '/cart', // GET /api/buyer/cart
      providesTags: ['Cart'],
    }),

    // ✅ Checkout order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders', // POST /api/buyer/orders
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Orders', 'Cart'],
    }),

    // ✅ Get past orders
    getOrders: builder.query({
      query: () => '/orders', // GET /api/buyer/orders
      providesTags: ['Orders'],
    }),

  }),
})

// Auto-generated hooks you can use in components
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
} = buyerApi