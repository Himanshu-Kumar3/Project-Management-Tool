import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import Workspaces from './Workspaces';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addWorkspaces } from '../utils/workspaceSlice';
const Sidebar = () => {

  const dispatch = useDispatch();
  const workspace = useSelector(store => store.workspace);
   const currentWorkspace = workspace.workspace;
   const workspaceList = workspace.workspaces;
  
  const [isOpen , setIsOpen] = useState(false);

  const getWorkspaces =async()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/getWorkspace" , {withCredentials:true});
      console.log("Workspaces" , res?.data?.data)
      dispatch(addWorkspaces(res?.data?.data));
    }catch(er){
      console.log(er.message)
    }
  }
  

  const handleLinkClass = ({ isActive})=>{
    return `text-xs flex mx-2  justify-start items-center p-2 h-8 rounded-md ${isActive ? "bg-base-300" :"hover:bg-base-200"}`
  }

  const handleToggleWorkspace = ()=>{
    setIsOpen(!isOpen);
  }
 
  useEffect(()=>{
    getWorkspaces();
    } , []);
  if(!currentWorkspace) return;
  console.log("Sidebar" , workspace)

  return (
    <div className='h-screen border border-gray-300 w-58  relative'>

      {/* For the workspace */}
      <div className='p-2   border-b border-base-300 ' >
      <div className='flex m-2 hover:bg-base-200 rounded-md justify-between items-center px-3 py-3' onClick={handleToggleWorkspace}>
         <div className='flex'>
        <img src='https://cdn-icons-png.freepik.com/512/7672/7672529.png' className='h-8 w-8  mr-4' alt='Image-logo'/>
        <div className=''>
          <h3 className='text-xs font-semibold'> {currentWorkspace.name}   </h3>
          <p className='text-xs text-zinc-500 '> {workspaceList.length} worksapces</p>
        </div>

      </div>
        <div className=''>
          <p className='text-xs'><i className="fa-solid fa-angle-down"></i></p>
        </div>
      </div>
     {isOpen &&  <div className=' absolute bg-base-100   z-2 w-55  shadow-md border  border-base-300 rounded-sm '>
        <h2 className='text-xs px-3 pt-3 pb-1 text-zinc-500'>WORKSPACES</h2>
        {workspaceList.map(workspace => (
         
          <Workspaces key={workspace._id} data={workspace } setIsOpen={(value)=> setIsOpen(value)} currentWorkspaceId={currentWorkspace._id}/>
          
          ))}

        <div className='border-t border-base-content/30 hover:bg-base-200 h-8 '>
          <Link to="/create-workspace" className='text-xs text-blue-500 pl-4 py-2 rounded-md'><i className="fa-solid fa-plus"></i> Create Workspace</Link>
        </div>


      </div>}
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