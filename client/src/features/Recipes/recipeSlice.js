import { createSlice } from "@reduxjs/toolkit";

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        recipes: []
    },
    reducers: {
        storeRecipes: (state, action) => {
            state.recipes = action.payload;
        }
    }
});

export const { storeRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;