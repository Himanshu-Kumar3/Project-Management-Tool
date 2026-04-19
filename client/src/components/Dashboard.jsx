import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import {addUser} from "../utils/userSlice";
import ProjectDashboard from './ProjectDashboard';
import CreateProject from './CreateProject';


const Dashboard = () => {
  const user = useSelector(store => store.user);
  const {workspace} = useSelector(store => store.workspace);



  
  const dispatch = useDispatch();
  const projects = 0;

  
  const getUser = async()=>{
    try{
      if(user) return ;
      const res = await axios.get(BASE_URL +"/user/getUser" , {withCredentials:true});
     
      dispatch(addUser(res?.data))
    }catch(er){
      console.log(er?.response);
    }
  }

  useEffect(()=>{
    getUser();
    // getWorkspace();
  } ,[]);


  if(!user) return;

  const {firstName , lastName} = user.data;
    
    return (
    <div className='p-6 md:p-12   bg-none relative'>
    
      <div className='info flex justify-between items-center px-1 '>
        <div className='name'>
          <h1 className='font-bold  text-xl'>Welcome back , {firstName+ " " + lastName}</h1>
          <p className='text-xs font-medium text-gray-500'>Here's What's happening with your project today</p>
        </div>
        <button className=' h-8 w-30 shadow-xl py-1 px-2 font-semibold text-sm text-white bg-blue-500 rounded-sm'>+ New Project</button>

      </div>

      {/* Detail info */}


      <div className='overview grid md:grid-cols-4  my-8  md:gap-4'>
        <div className='box rounded-md border p-4  py-3 bg-base-100 justify-between  border-gray-300 flex'>
          <div className='breif '>
            <h2 className='text-sm text-base-content/70'>Total projects</h2>
            <p className='text-3xl font-bold'>0</p>
            <p className='text-xs text-base-content/60'>projects in {workspace?.name.toLowerCase()} </p>
          </div>

          <span className='folder bg-blue-500/10 p-1 px-2 h-8  rounded-md'>
            <i className="fa-regular fa-folder-open text-blue-500"></i>
          </span>

        </div>
       <div className='box rounded-md border p-4  py-3 justify-between   border-gray-400 flex'>
          <div className='breif '>
            <h2 className='text-sm text-base-content/70'>Completed projects</h2>
            <p className='text-3xl font-bold'>0</p>
            <p className='text-xs text-base-content/60'>of {projects} total </p>
          </div>

          <span className='folder bg-emerald-500/10 p-1 px-2 h-8  rounded-md'>
         
            <i className="fa-regular fa-circle-check text-green-500"></i>
          </span>

        </div>
         <div className='box rounded-md border p-4  py-3 justify-between   border-gray-400 flex'>
          <div className='breif '>
            <h2 className='text-sm text-base-content/70' >My tasks</h2>
            <p className='text-3xl font-bold'>0</p>
            <p className='text-xs text-base-content/60'>assigned to me </p>
          </div>

          <span className='folder bg-purple-500/10 p-1 px-2 h-8  rounded-md'>
        
            <i className="fa-regular  fa-user text-purple-500"></i>
          </span>

        </div>
        <div className='box rounded-md border p-4  py-3 justify-between   border-gray-400 flex'>
          <div className='breif '>
            <h2 className='text-sm text-base-content/70 font-medium'>Overdue</h2>
            <p className='text-3xl  font-bold'>0</p>
            <p className='text-xs text-base-content/60'>need attention </p>
          </div>

          <span className='folder bg-amber-500/10  p-1 px-2 h-8  rounded-md'>
        
            <i className="fa-solid fa-triangle-exclamation text-amber-500"></i>
          </span>
        </div>
        
      </div>

      <div className='detailed info'> 
        <div>
           <ProjectDashboard data={workspace}/>
        </div>
        <div>

        </div>
       
      </div>

      {/* Modal for create-project */}
      <div className='absolute -top-14 -left-57'>
        <CreateProject data={workspace}/>
      </div>
    </div>
  );

}

export default Dashboard;