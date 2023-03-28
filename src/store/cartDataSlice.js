import { createSlice } from '@reduxjs/toolkit';

let cartData = createSlice({
  name: 'cartData',
  initialState: [
    { PK: 1, name: 'White and Black', count: 2 },
    { PK: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    setAddCount(state, action) {
      let elIndexFinder = state.findIndex((el) => {
        return el.PK === action.payload;
      });
      state[elIndexFinder].count += 1;
    },
    setMinorCount(state, action) {
      let elIndexFinder = state.findIndex((el) => {
        return el.PK === action.payload;
      });

      state[elIndexFinder].count -= 1;

      if (state[elIndexFinder].count === 0) {
        state.splice(elIndexFinder, 1);
      }
    },
    pushCartData(state, action) {
      state.push(action.payload);
    },
  },
});

export let { setAddCount, setMinorCount, pushCartData } = cartData.actions;

export default cartData;
