import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accord: 0,
  answer: 1,
};

const accSlice = createSlice({
  name: 'acc',
  initialState,
  reducers: {
    setAccord: (state, action) => {
      if (action.payload) {
        state.accord = 1;
        state.answer = 0;
      } else {
        state.accord = 0;
        state.answer = 1;
      }
    },
    toggleAccord: state => {
      state.accord ? (state.accord = 0) : (state.accord = 1);
      state.answer ? (state.answer = 0) : (state.answer = 1);
    },
  },
});

export const { setAccord, toggleAccord } = accSlice.actions;
export default accSlice.reducer;
