import React from 'react'
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const Sidebar = (props) => {

  console.log(props)
  
  const {data}= props;

  const handleLinkClass = ({ isActive})=>{
    return `text-xs flex mx-2  justify-start items-center p-2 h-8 rounded-md ${isActive ? "bg-gray-200" :"hover:bg-gray-100"}`
  }

  return (
    <div className='h-screen border border-gray-500 w-60 '>

      {/* For the workspace */}
      <div className='p-2   border-b border-gray-400'>
      <div className='flex m-2 hover:bg-gray-300 rounded-md justify-between items-center px-3 py-3'>
        <img src='https://cdn-icons-png.freepik.com/512/7672/7672529.png' className='h-8 w-8 ' alt='Image-logo'/>
        <div className='-ml-16'>
          <h3 className='text-xs font-semibold'> {data[0].name}   </h3>
          <p className='text-xs '> {data[0].slug}</p>
        </div>
        <div className=''>
          <p className='text-xs'><i className="fa-solid fa-angle-down"></i></p>
        </div>
      </div>

    </div>

    <div>

      {/* navlinks */} 
      <div className="h-45 p-3" >
        <NavLink to="/main" className= {handleLinkClass}>
          <i className="fa-regular fa-folder-open"></i>
          <h3 className='project ml-4 text-xs font-normal'>Dashboard</h3>
        </NavLink>
        <NavLink to="/main/project" className= {handleLinkClass}>
          <i className="fa-regular fa-folder-open"></i>
          <h3 className='project ml-4 text-xs font-normal'>Projects</h3>
        </NavLink>
        <NavLink to="/main/team" className={handleLinkClass}>
          <i className="fa-regular fa-folder-open"></i>
          <h3 className='project ml-4 text-xs font-normal'>Team</h3>
        </NavLink>
         <NavLink to="/main/setting" className={handleLinkClass}>
          <i className="fa-regular fa-folder-open"></i>
          <h3 className='project ml-4 text-xs font-normal'>Settings</h3>
        </NavLink>
      </div>

      <div>
        <div></div>
      </div>

    </div>

    </div>
    
  )
}

export default Sidebar;