import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Link} from 'react-router-dom';


const Navbar = props => {
  return (
    <Router>
    <nav className="navbar">
      <ul>
        <li><Link to="/profiles">Profiles</Link></li>
        <li><Link to="/gallery">Gallery</Link> <ul><li><Link to="/gallery/buttons">Buttons</Link></li></ul></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
    </Router>
  )
}

Navbar.propTypes = {

}

export default Navbar