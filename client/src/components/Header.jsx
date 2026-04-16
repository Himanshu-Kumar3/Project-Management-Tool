import React, { useState } from 'react'

const Header = () => {
  const [theme , setTheme] = useState(true);

  const handleTheme = ()=>{
    setTheme(!theme);
  }
  return (
    <div className='w-full flex justify-between  p-2 px-15 border-b border-gray-400'>
      <div className='border border-gray-400 items-center rounded-md focus-within:border-blue-400 focus-within:ring-1'>
        <i className="fa-brands fa-sistrix text-gray-600 pl-2 pt-1 text-xs mr-1  "></i>
         <input type='text' className='p-2 w-80 text-xs  focus:outline-none'  placeholder='Search project ,tasks ....'/>
      </div>

           
      <div className='flex items-center'>
        <div className='  p-1 px-2 rounded-md shadow-sm' onClick={handleTheme}>
        <i className={`fa-regular ${theme ===true ? "fa-sun" : "fa-moon"} `}></i> 
        </div>
        <img src="https://cdn-icons-png.freepik.com/512/7672/7672529.png" className=' ml-4 h-8 w-8 mt-1 rounded-full' alt="profile-logo" />

      </div>

    </div>
  )
}

export default Header;