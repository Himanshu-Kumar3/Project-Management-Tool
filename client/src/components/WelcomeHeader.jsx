import React from 'react'
import {Link} from "react-router-dom";

const WelcomeHeader = () => {

  return (

    <div data-theme="light">
      <div className="navbar bg-gray-300  shadow-md">
         <div className="flex-1">
           <a className="btn btn-ghost text-3xl text-neutral">Project</a>
         </div>

         <div className='nav-links'>
          <Link  to="/signup" className='p-2 mr-4 text-white bg-red-500 font-semibold active:text-black active:bg-red-400'>Get Started</Link>
         </div>

      </div>
    </div>
  )
}

export default WelcomeHeader;