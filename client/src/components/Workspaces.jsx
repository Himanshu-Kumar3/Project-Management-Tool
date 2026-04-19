import React from 'react'
import { useDispatch } from 'react-redux'
import { addWorkspace } from '../utils/workspaceSlice';

const Workspaces = ({data , setIsOpen , currentWorkspaceId}) => {
  const dispatch = useDispatch();
  
  console.log("Workspace component" ,data , setIsOpen , typeof(currentWorkspaceId));

  const handleClick =()=>{
    dispatch(addWorkspace(data));
    setIsOpen(false)
  }

  return (
      <div className='flex m-2 hover:bg-base-200 rounded-md justify-between items-center px-3 py-2' onClick={handleClick}  >
      <div className='flex'>
        <img src='https://cdn-icons-png.freepik.com/512/7672/7672529.png' className='h-8 w-8  mr-4' alt='Image-logo'/>
        <div className=''>
          <h3 className='text-xs font-semibold'> {data.name}   </h3>
          <p className='text-xs '> {data.slug}</p>
        </div>

      </div>
       
       {currentWorkspaceId === data.Id && <div className=''>
          <p className='text-xs text-emerald-500'><i class="fa-solid fa-check"></i></p>
        </div>}
      </div>
  )
}

export default Workspaces;