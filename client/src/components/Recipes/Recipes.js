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
                        <div id = 'recipes-list-container'>
                            <ul>
                                <li>Item1</li>
                                <li>Item2</li>
                                <li>Item3</li>
                                <li>Item4</li>
                                <li>Item5</li>
                            </ul>
                        </div>
                    </div>
                    <div id = 'recipes-right'>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipes;