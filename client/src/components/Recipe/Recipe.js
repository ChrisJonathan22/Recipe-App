import React, {useState , useEffect} from 'react';
import './Recipe.scss';
import { redirect, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipes } from '../../features/Recipes/recipeSlice';
import Axios from 'axios';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AlertMessage from '../AlertMessage/AlertMessage';
import RecipeForm from '../RecipeForm/RecipeForm';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

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
    const [showAlert, setAlertState] = useState(false);
    const [ editMode, setEditMode ] = useState(false);


    let recipe = JSON.parse(singleRecipe);
    // Take the recipe rating and find its percentage value.
    const starPercentage = (recipe.rating / 5) * 100;
    // Round up the percentage value and add the percentage symbol to the value.
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    // const recipesFromReduxState = useSelector((state) => state.saveRecipes.recipes);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const endpoint = "https://recipe-app-server.onrender.com/api/recipes/delete";

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [showAlert]);


    function deleteRecipe (recipe) {
        dispatch(deleteRecipes(recipe));
        setAlertState(true);
        setTimeout(() => navigate("/"), 5000);
        Axios.post(endpoint, { id: recipe._id });
    }  

    return (
        <div>
            {
                showAlert? <AlertMessage message="The recipe has been deleted! you will be redirected to the recipes page shortly." /> : null
            }

            {
                editMode?
                <RecipeForm title={recipe.title} image={recipe.image} duration={recipe.duration} steps={recipe.steps} rating={recipe.rating} id={recipe._id} editMode={true} />
                :
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
                                <Button variant="contained" color='warning' size="large" onClick={function (event) {
                                    event.preventDefault();
                                    deleteRecipe(recipe);
                                }
                                } style={{ backgroundColor: theme.palette.secondary.light }}>Delete</Button>
                            </Link>
                        </CardActions>
                        <CardActions>
                            <Link className="nav-link" exact to = '/'>
                                <Button variant="contained" color='warning' size="large" onClick={function (event) {
                                    event.preventDefault();
                                    setEditMode(true);
                                }
                                } style={{ backgroundColor: theme.palette.secondary.light }}>Edit</Button>
                            </Link>
                        </CardActions>
                    </div>
                </div>
            }
        </div>
    );
};