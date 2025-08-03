// 📁 src/redux/store.ts
// 📁 src/lib/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;