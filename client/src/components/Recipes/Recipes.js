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
        this.sendData = this.sendData.bind(this);
        this.showMessageAndSendData = this.showMessageAndSendData.bind(this);
    }

    // This method display a success message when the submit button has been clicked 
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
    
    // This method does a Post request with the data entered
    sendData() {
        let obj = {
            title: document.getElementById('form-title').value,
            image: this.state.src,
            duration: document.getElementById('form-duration').value,
            steps: document.getElementById('form-steps').value
        };

        fetch('http://localhost:5000/upload', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: obj.title,
                image: obj.image,
                duration: obj.duration,
                steps: obj.steps
            })
        })
        .then((res) => {
            console.log('Data sent!');
            
        });
    }
    
    // This method runs both the showMessage and sendData method when the submit button is clicked
    showMessageAndSendData(){
        this.showMessage();
        this.sendData();
    }

    componentDidMount() {
        // This is requesting data from the api
        fetch('http://localhost:5000/api/recipes')
        .then(res => res.json())
        .then(data => this.setState({ recipes: data.recipes }, () => console.log('Recipes fetched...', data.recipes[1])
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
                            <img src = {this.state.src} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Recipes;

