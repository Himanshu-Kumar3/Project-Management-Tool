import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addprojects } from '../utils/projectSlice';
import CreateProject from './CreateProject';

const ProjectDashboard = ({data }) => {

      const {projects} = useSelector(store => store.project);
      const currentProjects = projects;
    
      const dispatch = useDispatch();
      const [isOpen , setIsOpen] = useState(false);
       const {workspace} = useSelector(store => store.workspace);

      const getProjects = async()=>{
            try{
                  const res =  await axios.post(BASE_URL + "/workspace/getProjects/" +data._id  , {} ,{withCredentials:true} );

                  
                  dispatch(addprojects(res?.data?.data));

            }catch(er){
                  console.log(er.message);
            }
      }

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
};



      const handleClick = ()=>{
            setIsOpen(true);

      }

      useEffect(()=>{
            getProjects();
      } , []);

      if(!projects) return ;


    
      console.log(projects);
      if(projects.length === 0) return (
      <div className='w-full'>
        <div className=' w-full border border-gray-300 rounded-md '>
        <div className='flex justify-between border-b h-10 border-gray-300 px-4 p-2'>
            <h2 className='text-md'>
                  Project Overview
            </h2>
            <Link to="/main/project" className='text-sm'>View all <i className="fa-solid fa-arrow-right-long font-extralight"></i></Link>
      </div>
     
     <div className='w-full h-50  text-center flex flex-col justify-center items-center  '>
      <div className='flex items-center justify-center rounded-full h-14 w-14 bg-zinc-500/20'>
             <i className="fa-regular fa-folder-open text-2xl text-zinc-700  rounded-full "></i>
      </div>
      <p className='text-xs text-zinc-500 mt-2'>No Projects Yet</p>
      <button type='button' onClick={handleClick} className='py-2 px-4 rounded-md font-semibold cursor-pointer sahdow:sm bg-blue-600 text-xs mt-2 text-white '>Create Your First Project</button>


     </div>



    </div>
    {isOpen && <div className='fixed top-0 left-4 overflow-hidden z-4'>
        <CreateProject data={workspace} onClose={()=>setIsOpen(false)} />
      </div>}


</div>
   
  )

return (
      <div>
       <div className='w-full border border-gray-300 rounded-md '>
        <div className='flex justify-between border-b h-10 border-gray-300 px-4 p-2'>
            <h2 className='text-md'>
                  Project Overview
            </h2>
            <Link to="/main/project" className='text-sm'>View all <i className="fa-solid fa-arrow-right-long font-extralight"></i></Link>
      </div>
      <div className=" rounded-md ">
            {currentProjects.map((project) =>{
                const formattedDate = formatDate(project.startDate);
                  return <div className="p-6 border-b border-gray-400 rounded-sm hover:bg-base-200 hover:cursor-pointer">
                        <div className=" flex justify-between">
                              <div>
                               <h3 className="text-sm py-1 font-semibold">{project.name}</h3>
                              <p className="text-xs text-zinc-600">{project.discription}</p>
                              </div>
                              <div>
                                    <h2 className="bg-zinc-300 px-3 text-xs py-1  rounded-md">{project.status.toUpperCase()}</h2>
                              </div>      

                         </div>

                  <p className="text-xs text-zinc-600 pt-1"><i class="fa-regular fa-calendar"></i> {formattedDate}</p>

            </div>})}

      </div>
      </div>
            
      </div>
)  
}

export default ProjectDashboard;
