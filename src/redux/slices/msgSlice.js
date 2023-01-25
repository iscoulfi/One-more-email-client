import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  to: '',
  theme: '',
  message: '',
};

const msgSlice = createSlice({
  name: 'msg',
  initialState,
  reducers: {
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setTo, setTheme, setMessage } = msgSlice.actions;
export default msgSlice.reducer;
