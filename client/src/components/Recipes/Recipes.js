import React, { Component } from 'react';
import './Recipes.css';

class Recipes extends Component {
    constructor(){
        super();
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
                                <li>&bull; Item1</li>
                                <li>&bull; Item2</li>
                                <li>&bull; Item3</li>
                                <li>&bull; Item4</li>
                                <li>&bull; Item5</li>
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