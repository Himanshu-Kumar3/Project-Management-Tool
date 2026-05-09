import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';

const Profile = ({user}) => {
      const [isUpdateProfile , setIsUpdateProfle] = useState(false)
      const [firstName , setFirstName] = useState('')
      const [lastName , setLastName] = useState('');
      const [error , setError] = useState('');

      const dispatch = useDispatch();

      const handleSubmitProfile = async()=>{
            try{
                  const res = await axios.post(BASE_URL + "/user/updateUser" , {firstName , lastName} ,{withCredentials:true});
                  
                  dispatch(updateUser)


            }catch(er){
                  console.log(er.response)
            }
      }
  return (
    <div className='px-4 py-5'>
      <h2 className='text-xl font-semibold mb-3 mt-2 text-gray-600'>Profile Details</h2>


      <div className={`flex mt-6 pt-6 px-2  ${isUpdateProfile?'items-start':'items-center'} justify-between border-y pb-6 border-gray-300 `}>
            <h3 className={`mr-5 pl-2 text-sm font-semibol tracking-wide  `}>Profile</h3>

          {!isUpdateProfile ? (<div className="flex items-center">
            <img
            className='h-12 rounded-full mr-5'
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> 
             <div className='ml-4 flex items-center'>
              <h2 className='font-semibold tracking-wide text-sm'>{user.firstName + " " + user.lastName}</h2>
              <button className='btn rounded-md font-normal text-sm ml-3 hover:bg-base-300 py-2  px-2' onClick={()=>setIsUpdateProfle(true)}>update profile</button>
            </div>

            </div>) :(<div className=' w-[70%] p-2 px-3 rounded-md shadow-md border border-gray-300'>
                  <h2 className='text-sm font-semibold mt-2'>
                        UPDATE PROFILE
                  </h2>
                  
                  <form onSubmit={(e)=>e.preventDefault()} className=''>

                        
                        <div className='flex mt-2 '>
                              <fieldset className="fieldset  ">
                              <legend className="fieldset-legend ">First Name</legend>
                              <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm   mr-6 " placeholder="Enter name of project" />
                       </fieldset>

                       <fieldset className="fieldset  ">
                              <legend className="fieldset-legend ">Last Name</legend>
                              <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm    " placeholder="Enter name of project" />
                       </fieldset>
                        </div>


                       <div className='my-4 flex justify-end'>
                        <button className='bg-base-100 hover:bg-base-300 shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2   mr-4 ' onClick={()=>setIsUpdateProfle(false)}>Cancel</button>
                        <button className='bg-blue-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2' onClick={handleSubmitProfile}>Submit</button>
                       </div>
                  </form>


                  </div>)}   
     
            
          
        
      </div>

      <div className='flex justify-between px-3 pr-5 py-6'>
            <h2 className='text-sm'>Email Address </h2>
            <h3 className='text-sm font-semibold'>{user.emailId}</h3>
      </div>

     
    </div>
  )
}

export default Profile;