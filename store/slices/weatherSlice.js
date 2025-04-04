// store/slices/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWeatherHistory = createAsyncThunk(
  'weather/fetchHistory',
  async (city, { rejectWithValue }) => {
    try {
      // For demo purposes - simulating historical data
      // In a real app, you'd use a different endpoint that provides historical data
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cities: ['New York', 'London', 'Tokyo'],
  data: {},
  history: {},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    simulateWeatherAlert: (state, action) => {
      // This would be used to simulate weather alerts
      state.alerts = [...(state.alerts || []), action.payload];
    },
    clearWeatherAlerts: (state) => {
      state.alerts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.meta.arg] = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWeatherHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history[action.meta.arg] = action.payload;
      })
      .addCase(fetchWeatherHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { simulateWeatherAlert, clearWeatherAlerts } = weatherSlice.actions;
export default weatherSlice.reducer;