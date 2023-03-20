import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface FavoritesState {
  meals: string[];
}

const initialState: FavoritesState = {
  meals: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const alreadyFavorites = state.meals.includes(action.payload);

      if (alreadyFavorites) {
        state.meals.filter((meal) => meal !== action.payload);
      } else {
        state.meals.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.meals;

export default favoritesSlice.reducer;
