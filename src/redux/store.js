import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/authApi'
import { sellerApi } from './services/sellerApi'
import { productApi } from '@/redux/services/productApi'
import authSlice from './slices/authSlice'
import sellerProfileReducer from '@/redux/slices/sellerProfileSlice'
import productsReducer from "./slices/productsSlice"
import cartReducer from "./slices/cartSlice";
import { cartApi } from './services/cartApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    products: productsReducer,
    auth: authSlice,
    cart: cartReducer,
    sellerProfile: sellerProfileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      sellerApi.middleware,
      productApi.middleware,
      cartApi.middleware
    ),
    devtools: true 
})