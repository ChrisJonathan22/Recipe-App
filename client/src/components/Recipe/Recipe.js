import React from 'react';
import { redirect, Link, useLocation, useNavigate } from 'react-router-dom';

import './Recipe.scss';

import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipes } from '../../features/Recipes/recipeSlice';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MediaCard(props) {
    return (
      <Card sx={{ maxWidth: "100%" }}>
        <CardMedia
          sx={{ height: 400 }}
          image={props.imageSrc}
          title="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h4" component="div">
                {props.title}
            </Typography>
            <Typography variant="body3" color="text.secondary">
                {props.steps}
            </Typography>
            <Typography variant="h6" color="text.secondary">
                Difficulty:
            </Typography>
            <div id="stars-outer" style={{ display: 'inline-block' }}>
                <div id="stars-inner" style={{ width: `${props.difficulty}` }}></div>
            </div>
            <Typography variant="h6" color="text.secondary">
                Duration:
            </Typography>
            <Typography variant="body3" color="text.secondary">
                {props.duration}
            </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    );
  }





export default function Recipe (props)  {
    const location = useLocation();
    const { singleRecipe } = location.state;

    let recipe = JSON.parse(singleRecipe);
    // Take the recipe rating and find its percentage value.
    const starPercentage = (recipe.rating / 5) * 100;
    // Round up the percentage value and add the percentage symbol to the value.
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    // const recipesFromReduxState = useSelector((state) => state.saveRecipes.recipes);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div>
            <div className="recipe-preview-container">
                <div className="recipe-image" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                <div className="recipe-details">
                    <h2 className='recipe-title'>{recipe.title}</h2>
                    <div className='clear-title'></div>
                    
                    <p className='recipe-info'>Steps:</p>
                    <p className='recipe-content recipe-steps'>{recipe.steps}</p>
                    <div className="recipe-details--bottom">
                        <div className="recipe-details--ratings">
                            <p className='recipe-info'>Difficulty:</p>
                            <div id="stars-outer" style={{ display: 'inline-block' }}>
                                <div id="stars-inner" style={{ width: `${starPercentageRounded}` }}></div>
                            </div>
                        </div>
                        <div className="recipe-details--duration">
                            <p className='recipe-info'>Duration:</p>
                            <p className='recipe-content'>{recipe.duration}</p>
                        </div>
                    </div>
                    <CardActions>
                    <Link className="nav-link" exact to = '/'>
                    
                        {/* <span className="sr-only">(current)</span> */}
                        <Button variant="contained" color='warning' size="large" onClick={function (event) {
                            event.preventDefault();
                            // dispatch(deleteRecipes(recipe));
                            // Replace the alert with a component to display the message instead
                            // navigate would have to be delayed for maybe 5 - 10 seconds
                            alert("The recipe has been deleted! you will be redirected to the recipes page shortly after closing this alert");
                            navigate("/");
                        }
                        }>Delete</Button>
                    
                    </Link>

                        
                    </CardActions>
                </div>
                <h1>Test</h1>
                {/* <MediaCard imageSrc={recipe.image} title={recipe.title} steps={recipe.steps} difficulty={starPercentageRounded} duration={recipe.duration} /> */}
            </div>
        </div>
    );
    // Added the ability to delete a recipe from the Redux state
    // I now need to make an API request to delete an item
    // followed by a redirect
};