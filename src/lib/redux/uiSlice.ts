// src/lib/redux/uiSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of this slice's state
interface UiState {
  isDarkMode: boolean;
}

// Define the initial state
const initialState: UiState = {
  isDarkMode: false, // Start with light mode by default
};

const uiSlice = createSlice({
  name: 'ui', // The name of the slice
  initialState,
  // Reducers define how the state can be updated
  reducers: {
    // This reducer will be for toggling the dark mode
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    // This reducer can set the dark mode to a specific value
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

// Export the actions so you can use them in your components
export const { toggleDarkMode, setDarkMode } = uiSlice.actions;

// Export the reducer to be used in the store
export default uiSlice.reducer;