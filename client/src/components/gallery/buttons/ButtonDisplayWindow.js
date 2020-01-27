import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

const ButtonDisplayWindow = (props) => {

}



Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)