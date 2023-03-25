import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice';
import cartData from './store/cartDataSlice';

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cartData: cartData.reducer,
  },
});
