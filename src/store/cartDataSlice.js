import { createSlice } from '@reduxjs/toolkit';

let cartData = createSlice({
  name: 'cartData',
  initialState: [
    { id: 1, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    setAddCount(state, action) {
      state[action.payload].count += 1;
    },
    setMinorCount(state, action) {
      state[action.payload].count -= 1;
    },
    pushCartData(state, action) {
      state.push(action.payload);
    },
  },
});

export let { setAddCount, setMinorCount, pushCartData } = cartData.actions;

export default cartData;
