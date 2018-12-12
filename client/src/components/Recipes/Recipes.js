import React, { Component } from 'react';
// import {BrowserRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './Recipes.css';

class Recipes extends Component {
    constructor(){
        super();
        this.state = {
            recipes: [],
            showMe: false,
            fireRedirect: false,
            src: '',
            title: '',
            document: {
                title: '',
                image: '',
                duration: '',
                steps: ''
            }
        }
        this.showMessage = this.showMessage.bind(this);
        this.getData = this.getData.bind(this);
        this.sendData = this.sendData.bind(this);
        this.showMessageAndSendData = this.showMessageAndSendData.bind(this);
        this.fetchRecipe = this.fetchRecipe.bind(this);
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
            steps: document.getElementById('form-steps').value
        };

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
                steps: obj.steps
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
        this.sendData();
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
        fetch('http://localhost:5000/api/recipes/single', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // Turn it to json
        body: JSON.stringify({
            title: titleText
        })
    })
    // Receive the document found if the search matches and turn it to json
    .then((res) => {
        return res.json();   
    })
    // Now the data is in json format, update the state with the data
    .then((data) => {
        this.setState({document: {title: data.title, image: data.image, duration: data.duration, steps: data.steps}});
        console.log('Data received from the search.');
        console.log(this.state.document);
        
    });


        }

    componentDidMount() {
        // This is requesting data from the api
        fetch('http://localhost:5000/api/recipes')
        // I'm requesting data, turning the response which will be every found document and then I'm saving it to the state
        .then(res => res.json())
        .then(data => this.setState({ recipes: data.recipes }, () => console.log('Recipes fetched...', data.recipes[1])
        // It took me a while to figure out why I was having an issue. I couldn't display the fetched data because the response was an object with an array of objects but I expected it to be an array.
        // So I changed it from recipes: data to recipes: data.recipes
        ));
    }



    render() {
        // This represents fireRedirect from the state
        const { fireRedirect } = this.state;
        return (
            <div>
                {   /*If fireRedirect is true redirect to the homepage*/ 
                    fireRedirect && (<Redirect to='/'/>)
                }
                <div id = 'recipes-title'>
                    <h1>My Recipes!</h1>
                </div>
                <div id = 'recipes-para'>
                    <p>View and add more recipes.</p>
                </div>
                <div id = 'recipes-container'>
                    <div id = 'recipes-left'>
                        <div id = 'recipes-list-title'>
                            <h4>Recipes</h4>
                        </div>
                        <div id = 'recipes-list-container'>
                            <ul>
                                {  
                                    this.state.recipes.map(recipe =>  <li id = {recipe._id} onClick = {this.fetchRecipe}>&bull;{recipe.title}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                    <div id = 'recipes-right'>
                        <div id = 'recipes-form-holder'>
                            <form >
                                <input id = 'form-title' type = 'text' placeholder = 'Enter the title' name = 'title' />
                                <input id = 'form-image' type = 'file' placeholder = 'Upload an image' name = 'image' />
                                <input id = 'form-duration' type = 'text' placeholder = 'Enter the duration' name = 'duration'/>
                                <textarea id = 'form-steps' placeholder = 'Enter steps...' name = 'steps'></textarea>
                                <input id = 'form-button' type = 'submit' value = 'Submit' onClick = {this.showMessageAndSendData} onMouseEnter = {this.getData} />
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
                        {
                            /* If this.state.src is empty do nothing and if it isn't display the image
                                if (!this.state.src === null || !this.state.src === undefined) {

                                }
                            */

                        }
                            <img src = {this.state.src} />
                        </div>
                        <div id = "recipe-preview-container">
                            <h4>{this.state.document.title}</h4>
                            <img src = {this.state.document.image} />
                            <p>{this.state.document.steps}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Recipes;

