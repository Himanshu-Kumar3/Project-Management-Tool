import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "./Header";

const MainComponent = () => {
  return (
    <div className='w-[82%] min-h-screen overflow-y-auto ml-58 mt-17 overflow-x-hidden'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default MainComponent;