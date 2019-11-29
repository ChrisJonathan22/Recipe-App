import React from 'react';
import './Contact.scss';

const Contact = () => {
    return (
        <div>
            <div id="contact-title">
                <h1>Contact</h1>
            </div>
            <div id ="contact-image-holder">
            <div id = "bg-text">
                <p>My name is <h3>Chris Jonathan</h3></p>
                <p>and I'm a <h3>Web Developer</h3></p>
                <a href="https://github.com/ChrisJonathan22"><i class="fab fa-github"> ChrisJonathan22</i></a>
            </div>
            </div>
        </div>
    );
}

export default Contact;