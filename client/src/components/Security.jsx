import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Security = () => {

  const [isPasswordChange , setIsPasswordChange] = useState(false);
  const [currentPassword , setCurrentPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');
  const [verifiedNewPassword , setVerifiedNewPassword] = useState('');
  const [error , setError] = useState('');
  const [isToast , setIsToast] = useState(false);

  const handlePasswordChange = async()=>{
    try{
      console.log("I am Here")
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
          <h3 className='text-red-500 ml-20  text-sm font-semibold cursor-pointer'>Delete account</h3>
        </div>


        { isToast && <div className="toast toast-top toast-center">
      <div className="alert alert-info">
         <span>Password updated Sucessfuly.</span>
      </div>
    </div>}

    </div>
  )
}

export default Security;