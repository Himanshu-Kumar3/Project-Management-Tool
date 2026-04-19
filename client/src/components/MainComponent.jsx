import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "./Header";

const MainComponent = () => {
  return (
    <div className='w-[82%]'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default MainComponent;