import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/authApi'
import { sellerApi } from './services/sellerApi'
import { productApi } from '@/redux/services/productApi'
import authSlice from './slices/authSlice'
import sellerProfileReducer from '@/redux/slices/sellerProfileSlice'
import productsReducer from "./slices/productsSlice"
import cartReducer from "./slices/cartSlice";
import { cartApi } from './services/cartApi'
import { orderApi } from './services/orderApi'
import { pickupApi } from './services/pickupApi'
import { paymentApi } from './services/paymentApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [pickupApi.reducerPath]: pickupApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
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
      cartApi.middleware,
      orderApi.middleware,
      pickupApi.middleware,
      paymentApi.middleware
    ),
    devtools: true 
})