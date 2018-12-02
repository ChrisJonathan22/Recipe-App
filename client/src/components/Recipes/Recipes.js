import React, { Component } from 'react';
import './Recipes.css';

class Recipes extends Component {
    constructor(){
        super();
        this.state = {
            recipes: [],
            showMe: false,
            src: ''
        }
        this.showMessage = this.showMessage.bind(this);
        this.getData = this.getData.bind(this);
    }

    showMessage() {
      this.setState({
          showMe: true
      });
    }

    // This method takes the image before the form data is sent to the database, it turns the image to a base64 text and saves it in the state.
    // I need to do a post request and save the image within the collection.
    // Do a fetch request and save the data inside the state, then display it.
    getData(files) {
        let file = document.getElementById('form-image').files[0];
        let reader = new FileReader();
        reader.onload = ((theFile) => {
            return (e) => { 
                // console.log(e.target.result);
                this.setState({src : e.target.result});
                console.log('This data is coming from the state ' + this.state.src);
                
                
            }; 
        })(file);
        reader.readAsDataURL(file);
        // console.log(file);
    }
    
    


    componentDidMount() {
        fetch('http://localhost:5000/api/recipes')
        .then(res => res.json())
        .then(data => this.setState({ recipes: data.recipes }, () => console.log('Recipes fetched...', data.recipes[0])
        // It took me a while to figure out why I was having an issue. I couldn't display the fetched data because the response was an object with an array of objects but I expected it to be an array.
        // So I changed it from recipes: data to recipes: data.recipes
        ));
    }



    render() {
        return (
            <div>
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
                                    this.state.recipes.map(recipe =>  <li id = {recipe._id} >&bull;{recipe.title}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                    <div id = 'recipes-right'>
                        <div id = 'recipes-form-holder'>
                            <form method = 'POST' action = 'http://localhost:5000/upload' enctype = 'multipart/form-data'>
                                <input id = 'form-title' type = 'text' placeholder = 'Enter the title' name = 'title' />
                                <input id = 'form-image' type = 'file' placeholder = 'Upload an image' name = 'image' multiple />
                                <input id = 'form-duration' type = 'text' placeholder = 'Enter the duration' name = 'duration'/>
                                <textarea id = 'form-steps' placeholder = 'Enter steps...' name = 'steps'></textarea>
                                <input id = 'form-button' type = 'submit' value = 'Submit' onClick = {this.showMessage} onMouseEnter = {this.getData} />
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
                            <img src = {this.state.src} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Recipes;

