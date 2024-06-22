import React, { useState } from 'react';
import './RecipeForm.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useDispatch } from 'react-redux';
import { updateRecipes } from '../../features/Recipes/recipeSlice';


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

let state = {
    src: '',
    title: '',
    postData: false
}





// This method display a success message when the submit button has been clicked 
function showMessage(setshowMeState) {

    setshowMeState(true);

    setTimeout(() => {
        setshowMeState(false);
    }, 1500);
    
}

export default function RecipeForm (props) {

    const [showMe, setshowMeState] = useState(false);


    const dispatch = useDispatch();

    // This method does a Post request with the data entered
async function sendData() {
    let { postData, src } = state;
    let { editMode, id } = props;

    if (postData || props.editMode) {
        // This object contains all the data entered including the image as base64
        let obj = {
            title: document.querySelector('.form-title #outlined-basic').value,
            image: state.src,
            duration: document.querySelector('.form-duration #outlined-basic').value,
            steps: document.querySelector('.form-steps #outlined-textarea').value,
            rating: document.querySelector('.form-rating #outlined-basic').value
        };

        if (editMode === false) {
            props.getNewRecipe(obj);
        }


        // Reset input fields and the image src within the state
        document.querySelector('.form-title #outlined-basic').value = '';
        state.src = '';
        document.querySelector('.form-duration #outlined-basic').value = '';
        document.querySelector('.form-steps #outlined-textarea').value = '';
        document.querySelector('.form-rating #outlined-basic').value = '';
        document.getElementById('contained-button-file').value = '';

        
        // Send the data
        // Live server
        //https://react-recipe-app-19.herokuapp.com/upload
        //
        console.log("Edit mode:", editMode);
        if (editMode) {
            console.log("Editing recipe...");
            // 'https://recipe-app-server.onrender.com/api/edit'
            await fetch('http://localhost:3001/api/edit', {
            method: 'put',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // Turn the object to json
            body: JSON.stringify({
                title: obj.title,
                image: obj.image,
                duration: obj.duration,
                steps: obj.steps,
                rating: obj.rating,
                recipe_id: id
            })
        })
        .then((res) => {
            // A message to let me know that the data has been sent
            console.log('Data sent!', res.json());
            dispatch(
                updateRecipes(
                    {
                        title: obj.title,
                        image: obj.image,
                        duration: obj.duration,
                        steps: obj.steps,
                        rating: obj.rating,
                        recipe_id: id
                    }
                )
            );
        }).then((data) => console.log("It works", data));
        } else {
            fetch('https://recipe-app-server.onrender.com/api/upload', {
            method: 'post',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // Turn the object to json
            body: JSON.stringify({
                title: obj.title,
                image: obj.image,
                duration: obj.duration,
                steps: obj.steps,
                rating: obj.rating
            })
        })
        .then((res) => {
            // A message to let me know that the data has been sent
            console.log('Data sent!');       
        });
        }
    }
} 

// This method runs both the showMessage and sendData method when the submit button is clicked
function showMessageAndSendData(){
    showMessage(setshowMeState);
    setTimeout(() => {sendData();}, 1000);
}


/*
    This method takes the image before the form data is sent to the database, 
    it turns the image to a base64 text and saves it in the state.
    I need to do a post request and save the image within the collection.
    Do a fetch request and save the data inside the state, then display it.
*/
function getData(files) {
    let { editMode } = props;
    let file = document.getElementById('contained-button-file').files[0];
    if(file) {
        let reader = new FileReader();
        reader.onload = ((theFile) => {
        return (e) => { 
            state.src = e.target.result;                
        }; 
        })(file);
        reader.readAsDataURL(file);
        console.log(state.src);
        state.postData = true;
    }
    else {
        let { postData } = state;
        if (postData || editMode) return;
        else {
            alert("No file selected. Please upload an image or a placeholder will be used instead.");
            let question = prompt('Would you like to upload an image? if so then enter YES else enter NO.');

            if (question.toLowerCase() === 'yes') {
                return;
            } else {
                if (editMode) {
                    state.src = props.image;
                } else {
                    state.src = "https://via.placeholder.com/150x150";
                    state.postData = true;
                }
            }
        }
    }
}

    

    return (
        <div id = 'recipes-right'>
            <div id = 'recipes-form-holder'>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '60%' } }} validate autoComplete="off">
                                <TextField id="outlined-basic" className='form-title' label="Title" placeholder='Enter the title' name='title' variant="outlined" defaultValue={props.title ? props.title : null} />
                            
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    hidden
                                />
                                <label htmlFor="contained-button-file">
                                    <Button style={{ backgroundColor: theme.palette.secondary.light }} id='form-image' variant="contained" color="primary" component='span' size='medium' endIcon={<CloudUploadIcon />}>
                                    Upload image
                                    </Button>
                                </label>
                

                                <TextField id="outlined-basic" className='form-duration' label="Duration" placeholder='Enter the duration' name='duration' variant="outlined" defaultValue={props.duration ? props.duration : null} />

                                <TextField multiline fullWidth id="outlined-textarea" className='form-steps' label="Steps" placeholder='Enter the steps...' name='steps' variant="outlined" defaultValue={props.steps ? props.steps : null} />
                    
                                <TextField id="outlined-basic" className='form-rating' label="Rating" placeholder='Enter the difficulty between 0-5' name='rating' variant="outlined" defaultValue={props.rating ? props.rating : null} />

                                <Button style={{ backgroundColor: theme.palette.secondary.light }} id = 'form-button' color='primary' endIcon={<SaveIcon />} value = 'Submit' variant="contained" onClick = {showMessageAndSendData} onMouseEnter={getData}>Submit</Button>
                            </Box>
                    </CardContent>
                </Card>
                {
                    showMe ? 
                        <div id = 'message'>
                            <h3>Recipe successfully added!</h3>
                        </div> 
                        :null
                }
            </div>
        </div>
    );
}