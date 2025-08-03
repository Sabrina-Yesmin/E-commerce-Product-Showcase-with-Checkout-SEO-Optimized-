// 📁 src/lib/redux/slices/orderSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string;
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
  items: any[];
  total: number;
  timestamp: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;