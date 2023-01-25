import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import msgSlice from './slices/msgSlice';
import tableSlice from './slices/tableSlice';
import accSlice from './slices/accSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    table: tableSlice,
    msg: msgSlice,
    acc: accSlice,
  },
});
