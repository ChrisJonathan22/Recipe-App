import React, { Component } from 'react';
import './About.css';
import food from '../../../src/images/food.jpg';

class About extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <div id="about-title">
                    <h1>About</h1>
                </div>
                <div id = "image-holder">
                    <img id = "dish" alt = "Cooked dish on grey bowl" src = {food}/>
                </div>
                <div id = "container">
                    <p>This is a recipe app which allows users to create and view recipes.</p>
                </div>
            </div>
        );
    }
}

export default About;