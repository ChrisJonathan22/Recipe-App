import React, { Component } from 'react';
import './Home.css';
import  Salmon from '../../../src/images/Salmon.jpg';

class Home extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <div id='title'>
                    <h1>Welcome to my Recipe App</h1>
                </div>
                <div id = 'img-holder'>
                    <img id = 'salmon' alt = 'an image of a salmon' src = {Salmon} />
                    <p>Here is a perfectly cooked salmon.</p>
                </div>
            </div>
        );
    }
}

export default Home;