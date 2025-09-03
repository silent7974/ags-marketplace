import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Products'], 
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),
    getProducts: builder.query({
      query: () => '/products', // seller-specific
      providesTags: ['Products'],
    }),
    getPublicProducts: builder.query({
      query: () => '/public/products', // 👈 public route
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    getProductsBySearch: builder.query({
      query: (searchTerm) => `/search?query=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Products'],
    }),
  }),
});

export const { 
  useAddProductMutation, 
  useGetProductsQuery, 
  useGetPublicProductsQuery,   // 👈 export this
  useGetProductByIdQuery, 
  useUpdateProductMutation, 
  useDeleteProductMutation, 
  useGetProductsBySearchQuery 
} = productApi;