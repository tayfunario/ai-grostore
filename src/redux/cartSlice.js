import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    itemCount: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      if (state.items.some(item => item.id === id)) {
        state.items = state.items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
        state.itemCount += 1;
        state.totalPrice += price;
      } else {
        state.items = [...state.items, { ...action.payload, quantity: 1 }];
        state.itemCount += 1;
        state.totalPrice += price;
        state.totalPrice = Math.round(state.totalPrice * 100) / 100;
      }
    },
    decreaseQuantity: (state, action) => {
      const { id, price } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item.quantity > 1) {
        state.items = state.items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
        state.itemCount -= 1;
        state.totalPrice -= price;
      } else {
        state.items = state.items.filter(item => item.id !== id);
        state.itemCount -= 1;
        state.totalPrice -= price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;