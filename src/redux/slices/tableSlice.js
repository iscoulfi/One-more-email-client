import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  all: [],
  messages: [],
  sentMessages: [],
  status: 'loading', //loading | succes | error
};

export const getAll = createAsyncThunk('table/getAll', async () => {
  try {
    const { data } = await axios.get('/auth/all');
    return data.users;
  } catch (e) {
    console.log(e.message);
  }
});

export const getMessages = createAsyncThunk(
  'table/getMessages',
  async recipient => {
    try {
      const { data } = await axios.get(`/msg/${recipient}`);

      return data.messages;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const getSentMessages = createAsyncThunk(
  'table/getSentMessages',
  async sender => {
    try {
      const { data } = await axios.get(`/msg/sent/${sender}`);

      return data.messages;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const addMessage = createAsyncThunk(
  'table/addMessage',
  async ({ from, to, theme, message }) => {
    try {
      const { data } = await axios.post('/msg/addmsg', {
        from,
        to,
        theme,
        message,
      });

      return data;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    sentMsg: (state, action) => {
      state.sentMessages = [...state.sentMessages, action.payload];
    },
    inboxMsg: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getAll.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(getAll.fulfilled, (state, action) => {
      state.status = 'succes';
      state.all = action.payload;
    });

    builder.addCase(getAll.rejected, state => {
      state.status = 'error';
    });
    builder.addCase(getMessages.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.status = 'succes';
      state.messages = action.payload;
    });

    builder.addCase(getMessages.rejected, state => {
      state.status = 'error';
    });
    builder.addCase(getSentMessages.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(getSentMessages.fulfilled, (state, action) => {
      state.status = 'succes';
      state.sentMessages = action.payload;
    });

    builder.addCase(getSentMessages.rejected, state => {
      state.status = 'error';
    });
  },
});

export const { sentMsg, inboxMsg } = tableSlice.actions;
export default tableSlice.reducer;
