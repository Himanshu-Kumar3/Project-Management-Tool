import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import { addTheme } from '../utils/themeSlice';


const Header = () => {

  const dispatch = useDispatch();
  const [isTheme , setIsTheme] = useState(true);

  const handleTheme = ()=>{
  
     if(isTheme === true){
      dispatch(addTheme("light"));
    }else{
       dispatch(addTheme("dark"));
    }
    setIsTheme(!isTheme);
   

  }
  return (
    <div className='w-[82%] flex overflow-hidden bg-base-100 fixed top-0 z-10 justify-between shadow-sm p-2 px-15 border-b border-gray-300'>
      <div className='border border-gray-400 items-baseline rounded-md focus-within:border-blue-400 focus-within:ring-1'>
        <i className="fa-brands fa-sistrix text-gray-500 pl-2 pt-2  text-md mr-1  "></i>
         <input type='text' className='p-2 w-80 text-sm  focus:outline-none'  placeholder='Search project ,tasks ....'/>
      </div>

           
      <div className='flex items-center'>
        <div className='  p-1 px-2 rounded-md shadow-sm' onClick={handleTheme}>
        <i className={`fa-regular ${isTheme ===true ? "fa-sun" : "fa-moon"} `}></i> 
        </div>
        <img src="https://cdn-icons-png.freepik.com/512/7672/7672529.png" className=' ml-4 h-8 w-8 mt-1 rounded-full' alt="profile-logo" />

      </div>

    </div>
  )
}

export default Header;