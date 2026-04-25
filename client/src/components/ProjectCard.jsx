import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProject } from '../utils/projectSlice';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({data}) => {
      const {name , discription , priority , status} = data;
      const [range , setRange] = useState(0)
      const navigate = useNavigate();

      const dispatch = useDispatch();

      const handleProjectClick = ()=>{
        dispatch(addProject(data));
        navigate("/main/projects/project");

      }
  return (
    <div className='border border-gray-400 cursor-pointer  hover:bg-base-300 shadow-md mr-4 rounded-md mt-8 p-2 px-3 w-[full] sm:w-[30%] md:w-[30%] group' onClick={handleProjectClick}>
      <h3 className='text-sm font-bold  group-hover:text-blue-500  '>{name}</h3>
      <p className='text-xs text-zinc-500 font-semibold'>{discription || "No Discription"}</p>
      <div className='flex justify-between text-xs my-2'>
            <span className='bg-zinc-400    px-2   rounded-md'>{status.toUpperCase()}</span>
            <span className='text-zinc-700'>{priority.toUpperCase()} </span>
      </div>
      <div>
            <div className='flex justify-between text-xs mt-2'>
                  <p className='font-semibold text-zinc-700'>progress</p>
                  <p className='font-semibold text-zinc-700'><span className=' font-bold'>{range}</span>%</p>
            </div>
            <input type='range' min={0} max={100}   value={range} readOnly  className='w-full accent-blue-500' />
      </div>

    </div>
  )
}

export default ProjectCard;