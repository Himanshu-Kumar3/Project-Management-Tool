import React, { useState } from 'react'
import {useSelector} from "react-redux";
import CreateProject from './CreateProject';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const {projects} = useSelector(store=> store.project);
  const {workspace} = useSelector(store => store.workspace); 

  const [isCreateProject , setIsCreateProject] = useState(false);
  const handleCreateProject = ()=>{
    setIsCreateProject(true);
  }

  if(!projects) return;
  console.log(projects)

  const recentProject = [];


  return (
    <div className='w-full h-[100%] p-6 px-10 overflow-hidden'>
      <div className='flex w-full justify-between items-center px-1 '>
        <div className='title'>
           <h2 className='font-bold text-2xl'>
            Projects
           </h2>
           <p className='text-sm text-zinc-600' >Manage and track your projects</p>
        </div>
        <button className=' text-sm h-8 px-2 text-white rounded-xs shadow-sm cursor-pointer bg-blue-500 pr-3'><i className="fa-solid fa-plus"></i> New Task</button>
      </div>
      <div className='mt-6 flex items-baseline'>
        <div className='text-sm border border-gray-400 w-68 rounded-sm  focus-within:ring-1 py-1 mt-2'>
          <i className="fa-brands fa-sistrix text-gray-500 pl-2 pt-1 text-md mr-3  "></i>
          <input type="text" placeholder='Search projects...' className='focus:outline-none ' />
        </div>

        <select className='border border-gray-400 h-8 rounded-sm text-gray-800 px-1 text-sm ml-4'>
          <option value="" defaultChecked>All status</option>
          <option value="active">Active</option>
          <option value="planning">Planning</option>
          <option value="cancelled">Cancelled</option>
          <option value="hold">On Hold</option>
          <option value="completion">Completion</option>
        </select>
        <select className='border border-gray-400 h-8 rounded-sm text-gray-800 px-1 text-sm ml-4'>
          <option value="" defaultChecked>All Priority</option>
          <option value="high">High</option>
          <option value="meduim">Meduim</option>
          <option value="low">Low</option>
        </select>
      </div>

      {projects.length === 0 && <div   className='w-full h-[50%] mt-8  text-center pt-4'>
        <div className=' '>
          <i className="fa-regular fa-folder-open text-3xl p-6  pr-15 rounded-full text-zinc-700 bg-zinc-300"></i>
        </div>
        <h3 className='font-bold mt-2 text-sm'>No Projects found.</h3>
        <p className='text-xs text-zinc-600 font-semibold my-2'>Create your first project to get started</p>
        <button className=' text-xs h-8 px-2 mt-2 font-semibold text-white rounded-xs shadow-sm cursor-pointer bg-blue-500' onClick={handleCreateProject} ><i className="fa-solid fa-plus"></i> Create Project</button>
        </div>}

        <div className='flex flex-wrap'>
          {projects.map(project =>(
            <ProjectCard key={project._id} data={project}/>
          ))}
        </div>
        
       {isCreateProject && <CreateProject data={workspace} onClose={()=>setIsCreateProject(false)}/>}

    </div>
  )
}

export default Projects;