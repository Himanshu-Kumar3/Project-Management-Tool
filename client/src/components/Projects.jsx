import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import CreateProject from './CreateProject';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addprojects } from '../utils/projectSlice';
import { Link } from 'react-router-dom';

const Projects = () => {
  const {projects} = useSelector(store=> store.project);
  const {workspace} = useSelector(store => store.workspace); 

  const dispatch = useDispatch();
  const [isCreateProject , setIsCreateProject] = useState(false);
  const [searchProjects , setSearchProjects] = useState("");
  const [filteredProjects , setFilteredProjects] = useState(projects);


  useEffect(() => {
    if (!searchProjects.trim()) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.name.toLowerCase().includes(searchProjects.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchProjects, projects]);


  const handleSearchProjects = (value)=>{

    setSearchProjects(value)
  }

  const handleCreateProject = ()=>{
    setIsCreateProject(true);
  }
    
 const getProjects = async()=>{
            try{
                  if(projects.length !== 0) return ;
                  const res =  await axios.post(BASE_URL + "/workspace/getProjects/" +workspace._id  , {} ,{withCredentials:true} );

                  
                  dispatch(addprojects(res?.data?.data));

            }catch(er){
                  console.log(er.message);
            }
      }




  useEffect(()=>{
    if(projects.length===0){
      getProjects();
    }

  } ,[workspace?._id]);    

  if(!filteredProjects) return;
 





  return (
    <div className='w-full h-[100%] p-6 px-10  scrollbar-hide'>
      <div className='flex w-full justify-between items-center px-1 '>
        <div className='title'>
           <h2 className='font-bold text-2xl'>
            Projects
           </h2>
           <p className='text-sm text-zinc-600' >Manage and track your projects</p>
        </div>
        <button type='button' className='text-sm h-8 px-2 text-white rounded-xs shadow-sm cursor-pointer bg-blue-500 pr-3' onClick={handleCreateProject} ><i className="fa-solid fa-plus"></i> New Project</button>
      </div>
      <div className='mt-6 flex items-baseline'>
        <div className='text-sm border border-gray-400 w-80 rounded-sm  focus-within:ring-1 py-1 mt-2'>
          <i className="fa-brands fa-sistrix text-gray-500 pl-2 pt-1 text-md mr-3  "></i>
          <input type="text" placeholder='Search projects...' className='focus:outline-none ' value={searchProjects} onChange={(e)=> handleSearchProjects(e.target.value)} />
        </div>

      </div>

      {filteredProjects.length === 0 && <div   className='w-full h-[50%] mt-8  text-center pt-4'>
        <div className=' '>
          <i className="fa-regular fa-folder-open text-3xl p-6  pr-15 rounded-full text-zinc-700 bg-zinc-300"></i>
        </div>
        <h3 className='font-bold mt-2 text-sm'>No Projects found.</h3>
        <p className='text-xs text-zinc-600 font-semibold my-2'>Create your first project to get started</p>
        <button className=' text-xs h-8 px-2 mt-2 font-semibold text-white rounded-xs shadow-sm cursor-pointer bg-blue-500' onClick={handleCreateProject} ><i className="fa-solid fa-plus"></i> Create Project</button>
        </div>}

        <div className='flex flex-wrap'>
          {filteredProjects.map(project =>(
            <ProjectCard key={project._id} data={project}/>
          ))}
        </div>
        
        
        <div>
          
       {isCreateProject && <CreateProject data={workspace} onClose={()=>setIsCreateProject(false)}/>}


        </div>
        
    </div>
  )
}

export default Projects;