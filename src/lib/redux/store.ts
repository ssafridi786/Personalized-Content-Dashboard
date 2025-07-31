// src/lib/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice'; 
import { apiSlice } from './apiSlice'; // Import the API slice if you have one
import favoritesReducer from './favoritesSlice'; // **When you import a default export, you can give it any name you want.//
import sidebarReducer from './sidebarSlice'; // Import the sidebar slice

export const store = configureStore({
  reducer: {
    // Add your reducers here
    ui: uiReducer,
    favorites: favoritesReducer, // Add the favorites slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the content slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    // This adds the API middleware to handle caching, invalidation, polling, etc.
});

// These types are useful for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;