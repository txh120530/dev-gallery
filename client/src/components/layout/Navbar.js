import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'


const Navbar = props => {


  const authLinks = (
  <ul>
    <li><Link to="/profiles">Profiles</Link></li>
    <li><Link to="/gallery">Gallery</Link> <ul><li><Link to="/gallery/buttons">Buttons</Link></li></ul></li>
    <li><Link onClick={props.logout} to="/login">Logout</Link></li>
  </ul>
)

const guestLinks = (
  <ul>
    <li><Link to="/profiles">Profiles</Link></li>
    <li><Link to="/gallery">Gallery</Link> <ul><li><Link to="/gallery/buttons">Buttons</Link></li></ul></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
)

  return (
    <nav className="navbar">
    <div class="nav-top flex justify-between px-2">
      <Link to="/" className="logo text-white uppercase ">Dev Gallery</Link>
      <div>{!props.loading && (<Fragment>{props.user ? <Link className="text-white" to="/">Welcome, {props.user.name}!</Link> : null}</Fragment>)}</div>
    </div>
    {!props.loading && (<Fragment>{props.isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
}



const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
})

export default connect(mapStateToProps, { logout })(Navbar)