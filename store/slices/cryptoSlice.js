// store/slices/cryptoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.coincap.io/v2';

export const fetchCryptos = createAsyncThunk(
  'crypto/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/assets?limit=10`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCryptoDetails = createAsyncThunk(
  'crypto/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/assets/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCryptoHistory = createAsyncThunk(
  'crypto/fetchHistory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/assets/${id}/history?interval=d1`
      );
      return { id, data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  list: [],
  byId: {},
  history: {},
  loading: false,
  error: null,
  realTimeUpdates: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price, changePercent24Hr } = action.payload;
      if (state.byId[id]) {
        state.byId[id].priceUsd = price;
        state.byId[id].changePercent24Hr = changePercent24Hr;
      }
      
      // Update in list as well
      const coinIndex = state.list.findIndex(coin => coin.id === id);
      if (coinIndex !== -1) {
        state.list[coinIndex].priceUsd = price;
        state.list[coinIndex].changePercent24Hr = changePercent24Hr;
      }
      
      // Add to real-time updates for notifications
      state.realTimeUpdates.push({
        id,
        price,
        timestamp: Date.now(),
      });
      
      // Keep only the last 10 updates
      if (state.realTimeUpdates.length > 10) {
        state.realTimeUpdates.shift();
      }
    },
    clearRealTimeUpdates: (state) => {
      state.realTimeUpdates = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        action.payload.forEach(crypto => {
          state.byId[crypto.id] = crypto;
        });
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCryptoHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history[action.payload.id] = action.payload.data;
      })
      .addCase(fetchCryptoHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateCryptoPrice, clearRealTimeUpdates } = cryptoSlice.actions;
export default cryptoSlice.reducer;