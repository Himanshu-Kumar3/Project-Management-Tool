import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {  addWorkspaces } from '../utils/workspaceSlice';

const Invite = ({user}) => {
      console.log(user)
      const dispatch = useDispatch();

      const {fromUserEmail} = user;
      const handleAcceptInvite = async()=>{

        try{
          const res = await axios.post(BASE_URL + "/reviewConnection/accepted/" + user._id ,{}, {withCredentials:true});

          console.log(res.data.data.workspaceId)
          const workspaceId = res?.data.data.workspaceId;

          // Adding member to the database 
          const updatedWorkspace = await axios.post(BASE_URL + "/user/addMember/" + workspaceId  ,{} ,{withCredentials:true})
          console.log(updatedWorkspace);
          //  get all the workspace again and update the store with the workspace
          const allWorkspacesRes = await axios.get(BASE_URL + "/user/getWorkspace", {withCredentials: true});
          console.log(allWorkspacesRes?.data?.data);
          // Step 4: Update Redux store with all workspaces
          dispatch(addWorkspaces(allWorkspacesRes?.data?.data));
          
        }catch(er){  
          console.log(er.response)
        }
      }
  return (
    <div className='connection flex items-center justify-between m-4 my-2 ml-8 bg-base-300 w-[50%] p-4 rounded-xl'>
      <div className='body'>
       <h3 className='text-sm font-semibold'><span className='font-bold text-md text-blue-500'>{fromUserEmail} </span>invites you to join workspace</h3>

      </div>

      <div className='btn-div  pt-4  '>
      <button className="shadow-md py-1 px-2 ml-2 cursor-pointer font-normal bg-linear-to-r from-purple-500 to-pink-500 rounded-4xl " onClick={handleAcceptInvite} >Accept</button>
      </div>
      
    </div>
  )
}

export default Invite;

