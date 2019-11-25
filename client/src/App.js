import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';

const App = () =>  {
  return (
    <BrowserRouter>
        <Switch>
          <div className = "App">
          <Navbar />
          <Route exact path = '/' component = { Home } />
          <Route path = '/about' component = { About } />
          <Route path = '/recipes' component = { Recipes } />
          <Route path = '/contact' component = { Contact } />
          {/* <Route component = { NotFound } /> */}
          <Route exact={true} path='*'>
            <NotFound />
          </Route>
          </div>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
