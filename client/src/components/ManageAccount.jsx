import React, { useState } from 'react'

import Profile from './Profile';
import Security from './Security';

const ManageAccount = ({user}) => {
     const [activeView , setActiveview] = useState('profile');
       return (
     <div className=' z-50 fixed overflow-auto scrollbar-hide inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
      <div className='overflow-y-auto h-[80%]  scrollbar-hide bg-white shadow-md rounded-md w-[65%] flex flex-row flex-wrap'>

            <div className='navbar w-[30%] bg-base-300 shadow-lg flex flex-col text-start  items-start'>
                        <h2 className={` py-2 mt-2 px-2 rounded-md w-full ${activeView === 'profile' ? 'bg-gray-300 font-semibold':''} cursor-pointer`} onClick={()=>setActiveview('profile')}><i className="fa-regular fa-circle-user mr-2"></i> profile</h2>
                        <h2 className={`w-full py-2 mt-2 px-2 rounded-md ${activeView === 'security' ? 'bg-gray-300 font-semibold':''} cursor-pointer`} onClick={()=>setActiveview('security')}><i className="fa-solid fa-user-shield mr-2" ></i> Security</h2>
            </div>
            <div className='mainDiv w-[70%] bg-base-'>
                  {activeView === 'profile' && <Profile user={user}/>}
                  {activeView === 'security' && <Security user={user} />}
                  

            </div>

      </div>
    </div>
  )
}

export default ManageAccount;
