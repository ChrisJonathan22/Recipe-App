import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import About from './components/About/About';
// import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe';
// import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';

const App = () =>  {
  return (
    <BrowserRouter basename='/dev/react-recipe-app/'>
      <React.Fragment>
        <Navbar />
        <Routes>
          {/* <Route exact path = '/' component = { Home } /> */}
          {/* <Route path = '/about' component = { About } /> */}
          {/* <Route path = '/contact' component = { Contact } /> */}
          <Route exact path = '/' element = { <Recipes /> } />
          <Route exact path = '/:recipeId' element = { <Recipe /> } />
          <Route element = { <NotFound /> } />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
