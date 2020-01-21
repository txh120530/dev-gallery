import React from 'react'
import PropTypes from 'prop-types'

const Navbar = props => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="profiles.html">Profiles</a></li>
        <li><a href="gallery.html">Gallery</a> <ul><li><a href="gallery/buttons.html">Buttons</a></li></ul></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  )
}

Navbar.propTypes = {

}

export default Navbar