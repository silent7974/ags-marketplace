import { configureStore } from '@reduxjs/toolkit'
import { buyerApi } from './services/buyerApi'
import { sellerApi } from './services/sellerApi'
import { productApi } from '@/redux/services/productApi'
import authSlice from './slices/authSlice'
import sellerProfileReducer from '@/redux/slices/sellerProfileSlice'

export const store = configureStore({
  reducer: {
    [buyerApi.reducerPath]: buyerApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authSlice,
    sellerProfile: sellerProfileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      buyerApi.middleware,
      sellerApi.middleware,
      productApi.middleware
    ),
    devtools: true 
})