import React, { Component } from 'react';
import './Recipes.css';

class Recipes extends Component {
    constructor(){
        super();
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/recipes')
        .then(res => res.json())
        .then(data => this.setState({ recipes: data.recipes }, () => console.log('Recipes fetched...', data.recipes)
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
                                {console.log(this.state.recipes)}
                            </ul>
                        </div>
                    </div>
                    <div id = 'recipes-right'>
                        <div id = 'recipes-form-holder'>
                            <form>
                                <input id = 'form-title' type = 'text' placeholder = 'Enter the title' />
                                <input id = 'form-image' type = 'file' placeholder = 'Upload an image' />
                                <textarea id = 'form-steps' placeholder = 'Enter instructions...'></textarea>
                                <input id = 'form-button' type = 'submit' value = 'Submit' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipes;