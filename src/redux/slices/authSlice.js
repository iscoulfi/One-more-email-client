import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  user: null,
  status: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async username => {
  try {
    const { data } = await axios.post('/auth/login', {
      username,
    });

    if (data.user._id) {
      window.localStorage.setItem('id', data.user._id);
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export const getMe = createAsyncThunk('auth/getMe', async id => {
  try {
    const { data } = await axios.get(`/auth/all/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.status = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.status = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = action.payload.message;
      state.user = action.payload.user;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = action.payload.message;
    });
    builder.addCase(getMe.pending, state => {
      state.status = null;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.status = null;
      state.user = action.payload?.user;
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.status = action.payload.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
