import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recipes from './components/Recipes/Recipes';
import Contact from './components/Contact/Contact';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <div className = "App">
            <Navbar />
            <Route exact path = '/' component = { Home } />
            <Route path = '/about' component = { About } />
            <Route path = '/recipes' component = { Recipes } />
            <Route path = '/contact' component = { Contact } />
            </div>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
