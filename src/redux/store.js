import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/authApi'
import { sellerApi } from './services/sellerApi'
import { productApi } from '@/redux/services/productApi'
import authSlice from './slices/authSlice'
import sellerProfileReducer from '@/redux/slices/sellerProfileSlice'
import productsReducer from "./slices/productsSlice"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    products: productsReducer,
    auth: authSlice,
    sellerProfile: sellerProfileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      sellerApi.middleware,
      productApi.middleware
    ),
    devtools: true 
})