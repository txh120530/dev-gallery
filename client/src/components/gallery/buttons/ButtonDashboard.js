import React from 'react'
import {Link} from 'react-router-dom';

const ButtonDashboard = props => {
  return (
    <div>
      <Link className="bg-gray-200 p-4 font-bold inline-block hover:bg-red-100" to='/gallery/create-button'>Create a Button <i className="icon-pencil"></i></Link>
    </div>
  )
}



export default ButtonDashboard