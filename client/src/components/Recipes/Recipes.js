import React, { useState , useEffect, Fragment } from 'react';
import Spinner from '../Spinner/Spinner';
import RecipeForm from '../RecipeForm/RecipeForm';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveRecipes } from '../../features/Recipes/recipeSlice';
import './Recipes.scss';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import BasicTabs from '../BasicTabs/BasicTabs';


function Recipes () {
    const [loading, setLoadingState] = useState(true);
//     const [open, setOpen] = React.useState(false);

//   const handleTooltipClose = () => {
//     setOpen(false);
//   };

//   const handleTooltipOpen = () => {
//     setOpen(true);
//   };

    const recipesFromReduxState = useSelector((state) => state.saveRecipes.recipes);
    const dispatch = useDispatch();
    

    async function fetchAllRecipes(endpoint) {
        try {
            let dbResult = await Axios.get(endpoint);
            dispatch(saveRecipes(dbResult.data.recipes));
            console.log("Recipes fetched...");
        } catch(err) {
            console.log("Oops...there is an error");
            console.log(err);
        }
    } 

    useEffect(() => {
        // Live server
            if (recipesFromReduxState.length === 0) {
                fetchAllRecipes('https://recipe-app-server.onrender.com/api/recipes');
            }

        // Local server
        // fetchAllRecipes('http://localhost:3001/api/recipes');
    });

    useEffect(() => {
        if (recipesFromReduxState.length !== 0) {
            setLoadingState(false);
        }
    }, [recipesFromReduxState]);

    // This method will be passed on to the RecipeForm component
    // From within the RecipeForm component each newly added recipe object will be passed to the method
    // The new recipe will be received and added to the array of recipes (from Redux state) and displayed
    function getNewRecipe (recipe) {
        dispatch(saveRecipes([...recipesFromReduxState, recipe]));
    }

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
                                <>
                                    <BasicTabs>
                                        {/* Image view */}
                                        <ImageList sx={{ width: '100%', height: 'auto' }}>
                                            {recipesFromReduxState.map((recipe) => (
                                    
                                                <ImageListItem key={recipe.image}>
                                                    <Link key = {recipe._id + 1} to={{ pathname: `/${recipe._id}`}} state = {{ singleRecipe: `${JSON.stringify(recipe)}` }} style={{ textDecoration: 'none' }}>
                                                        <div className='recipe_bg_img'
                                                            style={{ backgroundImage: `url(${recipe.image})` }}
                                                            alt={recipe.title}
                                                            >
                                                        </div>
                                                    </Link>
                                                    <ImageListItemBar
                                                        title={recipe.title}
                                                        actionIcon={
                                                        <Tooltip title={recipe.title}>
                                                        <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)'}} aria-label={`info about ${recipe.title}`}>
                                                            <InfoIcon />
                                                        </IconButton>
                                                        </Tooltip>
                                                        }
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                        {/* List view */}
                                        <ul>
                                            {
                                                recipesFromReduxState.map(recipe => <Link key = {recipe._id} to={{ pathname: `/${recipe._id}`}} state = {{ singleRecipe: `${JSON.stringify(recipe)}` }} style={{ textDecoration: 'none' }}><li className='recipe-item' value={recipe.title}>{recipe.title}</li></Link>)
                                            }
                                        </ul>
                                    </BasicTabs>
                                </>
                            }
                        </div>
                    </div>
                    <RecipeForm getNewRecipe={getNewRecipe} editMode={false} />
                </div>
            </div>
        );
}

// Look to add Material UI if not already implemented and revamp the design


export default Recipes;

