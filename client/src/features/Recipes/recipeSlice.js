import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: []
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        saveRecipes: (state, action) => {
            state.recipes = action.payload;
        }
    }
});

export const { saveRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;