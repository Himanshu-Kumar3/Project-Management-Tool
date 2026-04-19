import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addprojects } from '../utils/projectSlice';

const ProjectDashboard = ({data}) => {

      const {projects} = useSelector(store => store.project);
      const dispatch = useDispatch();

      const getProjects = async()=>{
            try{
                  const res =  await axios.post(BASE_URL + "/workspace/getProjects/" +data._id  , {} ,{withCredentials:true} );

                  console.log("projectDashboard",res?.data?.data)
                  dispatch(addprojects(res?.data?.data));

            }catch(er){
                  console.log(er.message);
            }
      }

      useEffect(()=>{
            getProjects();
      } , []);

      if(!projects) return ;
      if(projects.length === 0) return (
    <div className='w-[70%] border border-gray-300 rounded-md '>
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
      <button type='button' onCli className='py-2 px-4 rounded-md font-semibold cursor-pointer sahdow:sm bg-blue-600 text-xs mt-2 text-white '>Create Your First Project</button>


     </div>



    </div>
  )
}

export default ProjectDashboard;
