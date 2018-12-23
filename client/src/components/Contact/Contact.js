import React, { Component } from 'react';
import './Contact.css';

class Contact extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <div id="contact-title">
                    <h1>Contact</h1>
                </div>
                <div id ="contact-image-holder">
                </div>
                <div id = "bg-text">
                    <h3>I am Chris Jonathan</h3>
                    <p>And I'm a Full Stack Developer</p>
                </div>
            </div>
        );
    }
}

export default Contact;