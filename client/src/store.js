import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./features/Recipes/recipeSlice";

export const store = configureStore({
    reducer: {
        saveRecipes: recipeReducer
    }
});