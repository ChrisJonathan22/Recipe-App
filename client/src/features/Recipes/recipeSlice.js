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
        },
        updateRecipes: (state, action) => {
            state.recipes = state.recipes.map((recipe) => {
                if (recipe._id === action.payload.recipe_id) {
                    console.log("This is the payload", action.payload);
                    recipe = action.payload;
                }
                console.log("Test");
            });
        }
    }
});

export const { saveRecipes, deleteRecipes, updateRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;