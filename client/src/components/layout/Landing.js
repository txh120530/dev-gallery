import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



const Landing = props => {
  if(props.isAuthenticated){
    return <Redirect to='/dashboard' />
  }

  return (
    <div>
    <div class="container hero-container">
      <h1 className="text-6xl font-bold text-center text-blue-500">TNT Dev Gallery</h1>
			<p className="text-2xl font-bold text-center text-blue-500">Create, Share, and Copy TNT Component Designs. (Or something like that, Iunno)</p>

			<div className="text-center my-10">
			<Link to="/register" className="text-3xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-6 rounded-l">Register</Link>
			<Link to="/login" className="text-3xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-6 rounded-r">Log In</Link>
</div>
</div>


      <div class="background">
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
</div>
    </div>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing)