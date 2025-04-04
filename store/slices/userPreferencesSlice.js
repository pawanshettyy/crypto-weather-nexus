// store/slices/userPreferencesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteCities: [],
  favoriteCryptos: [],
};

// Try to load initial state from localStorage if available (client-side only)
if (typeof window !== 'undefined') {
  const savedPreferences = localStorage.getItem('userPreferences');
  if (savedPreferences) {
    try {
      const parsed = JSON.parse(savedPreferences);
      initialState.favoriteCities = parsed.favoriteCities || [];
      initialState.favoriteCryptos = parsed.favoriteCryptos || [];
    } catch (e) {
      console.error('Failed to parse saved preferences', e);
    }
  }
}

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      const index = state.favoriteCities.indexOf(city);
      
      if (index === -1) {
        state.favoriteCities.push(city);
      } else {
        state.favoriteCities.splice(index, 1);
      }
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify(state));
      }
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      const index = state.favoriteCryptos.indexOf(crypto);
      
      if (index === -1) {
        state.favoriteCryptos.push(crypto);
      } else {
        state.favoriteCryptos.splice(index, 1);
      }
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify(state));
      }
    },
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;