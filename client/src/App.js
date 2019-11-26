import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';

const App = () =>  {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path = '/' exact component = { Home } />
          <Route path = '/about' component = { About } />
          <Route path = '/recipes' exact component = { Recipes } />
          <Route path = '/single-recipe:recipeId' component = { Recipe } />
          <Route path = '/contact' component = { Contact } />
          <Route component = { NotFound } />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
