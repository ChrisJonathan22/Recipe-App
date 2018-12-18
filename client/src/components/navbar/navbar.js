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
                <nav className = 'nav-wrapper red darken-3'>
                  <div className = 'container'>
                    {/* Using Link enables us to stop the app from making a request to the server every time we click on a link to take us to a different component and NavLink does the same except when you click a link the link clicked on receives a class of active.  */}
                      <a className = 'brand-logo left'><NavLink exact to = '/'>Logo</NavLink></a>
                      <ul className = 'right hide-on-med-and-down'>
                          <li><a><NavLink exact to = '/'>Home</NavLink></a></li>
                          <li><a><NavLink to = '/recipes'>Recipes</NavLink></a></li>
                          <li><a><NavLink to = '/about'>About</NavLink></a></li>
                          <li><a><NavLink to = '/contact'>Contact</NavLink></a></li>
                      </ul>
                  </div>
                </nav>
            </div>
    );
  }
}

export default Navbar;
