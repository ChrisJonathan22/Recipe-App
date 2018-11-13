import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
  constructor(){
    super();
    // this.state = {
    //     customers: []
    // };
  }

  // componentDidMount() {
  //   fetch('/api/customers')
  //   .then(res => res.json())
  //   .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)
  //   ));
  // }

  render() {
    return (
      <div>
          <h2>This is the fun part.</h2>
      </div>
    );
  }
}

export default Navbar;
