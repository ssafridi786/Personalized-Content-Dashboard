// src/lib/redux/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '@/components/dashboard/ContentCard'; 

interface FavoritesState {
  articles: Article[];
}

const initialState: FavoritesState = {
  articles: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Article>) => {
      // Add the article if it's not already in the list
      const exists = state.articles.find(article => article.url === action.payload.url);
      if (!exists) {
        state.articles.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<Article>) => {
      // Remove the article by its URL
      state.articles = state.articles.filter(
        article => article.url !== action.payload.url
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;