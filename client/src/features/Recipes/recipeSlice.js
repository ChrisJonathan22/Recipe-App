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
        },
        deleteRecipes: (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe._id !== action.payload._id);
        }
    }
});

export const { saveRecipes, deleteRecipes } = recipeSlice.actions;
// export const { deleteRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;