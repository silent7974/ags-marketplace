import { configureStore } from '@reduxjs/toolkit'
import { buyerApi } from './services/buyerApi'
import { sellerApi } from './services/sellerApi'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [buyerApi.reducerPath]: buyerApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      buyerApi.middleware,
      sellerApi.middleware
    ),
})