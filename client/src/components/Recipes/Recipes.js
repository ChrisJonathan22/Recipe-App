import React, { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import RecipeForm from '../RecipeForm/RecipeForm';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Recipes.scss';

function Recipes () {
    const [recipes, storeRecipes] = useState([]);
    const [loading, setLoadingState] = useState(true);

    async function fetchAllRecipes(endpoint) {
        try {
            console.log("Database data test2");
            let result = await Axios.get(endpoint);
            console.log("Database data", result.data.recipes);
            storeRecipes(result.data.recipes);
            setLoadingState(false);
        } catch(err) {
            console.log("Oops...there is an error");
            console.log(err);
        }
    } 

    // This method will be passed on to the RecipeForm component
    // From within the RecipeForm component each newly added recipe object will be passed to the method
    // The new recipe will be received and added to the array of recipes and displayed
    function getNewRecipe (recipe) {
        storeRecipes([...recipes, recipe]);
    }

    useEffect(() => {
        fetchAllRecipes('http://localhost:3001/api/recipes');
        // Local server
        // fetchAllRecipes('http://localhost:6000/api/recipes');
        // Live server
        // this.fetchAllRecipes('https://react-recipe-app-19.herokuapp.com/api/recipes');
        // this.fetchAllRecipes('https://recipe-app-server.onrender.com/api/recipes');
    }, []);

        return (
            <div>
                <div id = 'recipes-title'>
                    <h1>My Recipes!</h1>
                </div>
                <div id = 'recipes-para'>
                    <p>View and add new recipes.</p>
                </div>
                <div id = 'recipes-container'>
                    <div id = 'recipes-left'>
                        <div id = 'recipes-list-title'>
                            <h4>Recipes</h4>
                        </div>
                        <div id = 'recipes-list-container'>
                            { loading ? 
                                <Spinner />   
                                :
                                <ul>
                                    {  
                                        recipes.map(recipe =>  <Link key = {recipe._id} to={{ pathname: `/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}` }} style={{ textDecoration: 'none' }}><li className='recipe-item' value={recipe.title} onClick = {this.fetchRecipe}>{recipe.title}</li></Link>)
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                    <RecipeForm getNewRecipe={getNewRecipe} />
                </div>
            </div>
        );
}


export default Recipes;

