import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice'
import { removeWorkspace } from '../utils/workspaceSlice'
import { removeProjects } from '../utils/projectSlice'
import { removeAllTasks } from '../utils/taskSlice'

const Security = () => {

  const user = useSelector((store) => store.user);
  const [isPasswordChange , setIsPasswordChange] = useState(false);
  const [currentPassword , setCurrentPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');
  const [verifiedNewPassword , setVerifiedNewPassword] = useState('');
  const [error , setError] = useState('');
  const [isToast , setIsToast] = useState(false);
  const [isDelete , setIsDelete] = useState(false)
  const [isDeleteToast , setIsDeleteToast] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handlePasswordChange = async()=>{
    try{
     const res =  await axios.post(BASE_URL+ "/user/updatePassword" , {currentPassword , newPassword ,verifiedNewPassword } , {withCredentials:true});
      
      console.log(res.data.data)
      setIsToast(true);
      setTimeout(()=>{
        setIsToast(false);
        setIsPasswordChange(false);
      }, 1500)

      

    }catch(er){
     
      setError(er?.response?.data.message)
    }

  }


  const handleDeleteAccount = async ()=>{
    try{

      const userId = user.data._id;
      const res = await axios.post(BASE_URL + "/user/deleteUser/" + userId , {} , {withCredentials:true});
      setIsDeleteToast(true)

      setTimeout(()=>{
        setIsDeleteToast(false);
         dispatch(removeUser());
         dispatch(removeWorkspace());
         dispatch(removeProjects());
      // dispatch(removeTasks());
         dispatch(removeAllTasks());
        navigate("/Signup")
      } , 1500);
      
      
    }catch(er){
      setError(er.response.data.message)
      
    }
  }
  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold border-b border-gray-400 pb-4 text-gray-700'>Security</h2>

      <div className='flex justify-start items-start mt-10 px-12 '>
        <h3 className='text-sm font-semibold'>Password</h3>
        {!isPasswordChange ?(<button className='hover:bg-gray-200 text-sm px-2 py-1 rounded-md cursor-pointer hover:border hover:font-medium ml-28' onClick={()=>setIsPasswordChange(true)}>Set Password</button>):(
         
         <form onSubmit={(e)=>e.preventDefault()} className='w-[70%] border rounded-md shadow-lg border-gray-300 px-3 ml-20 py-3'>
          <fieldset className="fieldset  ">
                   <legend className="fieldset-legend ">Current Password :</legend>
                    <input type="text" value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm w-full" placeholder="Enter current password" />
               </fieldset>
                <fieldset className="fieldset  ">
                   <legend className="fieldset-legend ">New Password :</legend>
                    <input type="text" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm w-full" placeholder="Enter new password" />
               </fieldset>
               <fieldset className="fieldset  ">
                   <legend className="fieldset-legend ">Retype new Password :</legend>
                    <input type="text" value={verifiedNewPassword} onChange={(e)=> setVerifiedNewPassword(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm w-full" placeholder="Retype new password" />
               </fieldset>
               <p className='text-xs text-red-500'>
                              {error}
                </p>

                <div className='my-4 flex justify-end'>
                 <button className='bg-base-100 hover:bg-base-300 shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2   mr-4 ' onClick={()=>setIsPasswordChange(false)}>Cancel</button>
               <button   className='bg-blue-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2' onClick={handlePasswordChange}>Update Password</button>

               </div>
         </form>
        )}

        
      </div>
      <div className='flex justify-start px-12 mt-8'>
          <h3 className='text-sm font-semibold'>Delete Account</h3> 
          <h3 className='text-red-500 ml-20  text-sm font-semibold cursor-pointer' onClick={()=>setIsDelete(true)}>Delete account</h3>
        </div>

        {isDelete && (
          <div className=' z-50 fixed overflow-auto scrollbar-hide inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center '>
             <div className='relative overflow-y-auto  scrollbar-hide bg-white shadow-md rounded-md w-[40%]  p-6'>
              <h2 className='font-semibold'>DELETE ACCOUNT</h2>
              <h4 className='text-sm font-semibold mt-2'>Are you sure want to delete the account ..? If you do , You will loose all your data..!</h4>
              
               <div className='  flex justify-end items-end '>
                 <button className='bg-base-100 hover:bg-base-300 shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2   mr-4 ' onClick={()=>setIsDelete(false)}>Cancel</button>
               <button onClick={handleDeleteAccount} className='bg-red-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2'>Delete Account</button>
               </div>
              
            
           </div>

            { isDeleteToast && <div className="toast toast-top toast-center">
      <div className="alert alert-error">
         <span>User Deletes successfully Sucessfuly.</span>
      </div>
    </div>}
         </div>
        )}


        { isToast && <div className="toast toast-top toast-center">
      <div className="alert alert-info">
         <span>Password updated Sucessfuly.</span>
      </div>
    </div>}

    </div>
  )
}

export default Security;