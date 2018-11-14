import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  constructor(){
    super();
  }

  render() {
    return (
            <div>
                <div id="nav-container">
                  <nav>
                    {/* Using Link enables us to stop the app from making a request to the server every time we click on a link to take us to a different component and NavLink does the same except when you click a link the link clicked on receives a class of active.  */}
                      <a><NavLink to = '/'>Home</NavLink></a>
                      <a><NavLink to = '/recipes'>Recipes</NavLink></a>
                      <a><NavLink to = '/about'>About</NavLink></a>
                      <a><NavLink to = '/contact'>Contact</NavLink></a>
                  </nav>
                </div>
            </div>
    );
  }
}

export default Navbar;
