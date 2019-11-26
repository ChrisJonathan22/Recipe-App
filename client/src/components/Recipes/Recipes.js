import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';
// import {BrowserRouter} from 'react-router-dom';
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import './Recipes.scss';

class Recipes extends Component {
    constructor(){
        super();
        this.state = {
            recipes: [],
            showMe: false,
            fireRedirect: false,
            loading: true,
            src: '',
            title: '',
            document: {
                title: '',
                image: '',
                duration: '',
                steps: '',
                rating: ''
            }
        };
        this.showMessage = this.showMessage.bind(this);
        this.getData = this.getData.bind(this);
        this.sendData = this.sendData.bind(this);
        this.showMessageAndSendData = this.showMessageAndSendData.bind(this);
        this.fetchRecipe = this.fetchRecipe.bind(this);
        this.fetchAllRecipes = this.fetchAllRecipes.bind(this);
    }

    // This method display a success message when the submit button has been clicked 
    showMessage() {
      this.setState({
          showMe: true
      });
    }

    /*
        This method takes the image before the form data is sent to the database, 
        it turns the image to a base64 text and saves it in the state.
        I need to do a post request and save the image within the collection.
        Do a fetch request and save the data inside the state, then display it.
    */
    getData(files) {
        let file = document.getElementById('form-image').files[0];
        if(file) {
            let reader = new FileReader();
            reader.onload = ((theFile) => {
            return (e) => { 
                this.setState({src : e.target.result});                
            }; 
            })(file);
            reader.readAsDataURL(file);
        }
        else {
            // this.setState({src: "https://via.placeholder.com/150x150"});
            alert("No file selected");
        }
        
    }
    
    // This method does a Post request with the data entered
    sendData() {
        // This object contains all the data entered including the image as base64
        let obj = {
            title: document.getElementById('form-title').value,
            image: this.state.src,
            duration: document.getElementById('form-duration').value,
            steps: document.getElementById('form-steps').value,
            rating: document.getElementById('form-rating').value
        };
        console.log(obj.rating);
        // Send the data
        fetch('http://localhost:5000/upload', {
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
        // setTimeout(() => {this.setState({ fireRedirect: true });}, 1000);
        this.setState({ fireRedirect: true });
    }
    
    // This method runs both the showMessage and sendData method when the submit button is clicked
    showMessageAndSendData(){
        this.showMessage();
        setTimeout(() => {this.sendData();}, 1000);
        
    }
    /*
        This method will fetch data belonging to the recipe title clicked on
        It'll know which element was clicked on by using the event object or e in this case
        I'm doing a post request with the title and I'm receiving the data related to that titled document
    */

    fetchRecipe(e) {
        /*
            This regex will remove the bullet point from the string, the bullet point is added to the text within the HTML
            It is not the typical unordered list item bullet point and then store it within state
        */    
        let regex = /[^a-zA-Z0-9]+/;
        let titleText = e.target.innerText.replace(regex, '');
        /* 
            setState works Asynchronously and if you have multiple setStates they will not be
            updated one by one instead they'll be updated as a group.
            If you need to update the state separately rather than using this.setState({title: data})
            You could add a callback like so this.setState({title: data}, function () { console.log('State changed'); })
        */
        
        // Send data, specifically the title
    //     fetch('http://localhost:5000/api/recipes/single', {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     // Turn it to json
    //     body: JSON.stringify({
    //         title: titleText
    //     })
    // })
    // // Receive the document found if the search matches and turn it to json
    // .then((res) => {
    //     return res.json();   
    // })
    // // Now the data is in json format, update the state with the data
    // .then((data) => {
    //     // Take the rating and find its percentage value
    //     const starPercentage = (data.rating / 5) * 100;
    //     // Round up the percentage value and add the percentage symbol to the value
    //     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    //     // Store the data received inside the state property of document including the rounded percentage rating
    //     this.setState({document: {title: data.title, image: data.image, duration: data.duration, steps: data.steps, rating: starPercentageRounded}});
    //     // Set the width of the empty stars to the width of the yellow stars which comes from the rounded percentage rating
    //     document.getElementById('stars-inner').style.width = this.state.document.rating;
    //     // The stars outer is hidden by default which is why it's being displayed here when the ratings are available
    //     document.getElementById('stars-outer').style.display = 'inline-block';
                
    //     console.log('Data received from the search.');
    //     console.log(this.state.document);
    // });


        }

    async fetchAllRecipes(endpoint) {
        let result = await Axios.get(endpoint);
        console.log('Axios req', result);
        this.setState( { recipes: result.data.recipes, loading: false }, () => console.log('Recipes fetched...', result.data.recipes[1]) )
    } 

    componentDidMount() {
        // I'm requesting data, turning the response which will be every found recipe and then I'm saving it to the state
        this.fetchAllRecipes('http://localhost:5000/api/recipes');
    }



    render() {
        // This represents fireRedirect from the state
        const { fireRedirect, recipes, loading } = this.state;
        return (
            <div>
                {   /*If fireRedirect is true redirect to the homepage*/ 
                    fireRedirect && (<Redirect to='/'/>)
                }
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
                                        recipes.map(recipe =>  <Link to={{ pathname: `/${recipe._id}`, singleRecipe: `${JSON.stringify(recipe)}` }} style={{ textDecoration: 'none' }}><li className='recipe-item' key = {recipe._id} value={recipe.title} onClick = {this.fetchRecipe}>{recipe.title}</li></Link>)
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                    <div id = 'recipes-right'>
                        <div id = 'recipes-form-holder'>
                            <form >
                                <input id = 'form-title' type = 'text' placeholder = 'Enter the title' name = 'title' autoComplete = 'off' />
                                <input id = 'form-image' type = 'file' placeholder = 'Upload an image' name = 'image' />
                                <input id = 'form-duration' type = 'text' placeholder = 'Enter the duration' name = 'duration' autoComplete = 'off'/>
                                <textarea id = 'form-steps' placeholder = 'Enter steps...' name = 'steps'></textarea>
                                <input id = 'form-rating' type = 'text' placeholder = 'Enter difficulty between 0-5' name = 'rating' />
                                <input id = 'form-button' type = 'button' value = 'Submit' onClick = {this.showMessageAndSendData} onMouseEnter = {this.getData} />
                            </form>
                            {
                                this.state.showMe ? 
                                    <div id = 'message'>
                                        <h3>Recipe successfully added!</h3>
                                    </div> 
                                    :null
                            }
                        </div>
                        <div id = 'image-preview-container'>
                            <img alt={this.state.title} src = {this.state.src} />
                        </div>
                        <div id = "recipe-preview-container">
                            <h4>{this.state.document.title}</h4>
                            <img alt = {this.state.document.title} src = {this.state.document.image} />
                            <p>{this.state.document.duration}</p>
                            <p>{this.state.document.steps}</p>
                            <div id="stars-outer">
                                <div id="stars-inner"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Recipes;

