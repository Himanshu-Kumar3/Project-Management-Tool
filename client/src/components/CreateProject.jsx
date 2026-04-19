import React from 'react'
import { useState } from 'react';

const CreateProject = ({data}) => {

      const [status , setStatus] = useState("");
      const [name , setName] = useState("");
      const [discription , setDiscription] = useState("");
      
  return (
      <div className='overflow-hidden  h-screen w-screen flex justify-center'>
      <div className='bg-amber-50 w-[35%] p-6'>
      <h1>Create New Project</h1>    
      <p className='text-xs'>In workspce : {data?.name}</p>  
      <div className='flex'>
             <form onSubmit={(e)=>e.preventDefault()} className='w-full'>
                <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Project name</legend>
                    <input type="text" className="input w-full" placeholder="Enter name of project" />
               </fieldset>
               <fieldset className="fieldset">
                   <legend className="fieldset-legend">Your bio</legend>
                   <textarea className="textarea h-18 w-full"  placeholder="Bio"></textarea>
              </fieldset>
             
             <div className='grid grid-cols-2 gap-4'>
             <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Status</legend>
                   <select className='h-10  bg-base-100' type='number' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="planning" defaultChecked>Planning</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="on hold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                   </select>
               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Priority</legend>
                   <select className='h-10  bg-base-100' type='number' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="low" defaultChecked>Low</option>
                        <option value="meduim">Meduim</option>
                        <option value="high">High</option>
                   </select>
               </fieldset>

               </div>


            <div className='grid grid-cols-2 gap-4'>
             <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Start Date</legend>

               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend">End Date</legend>
                   <select className='h-10  bg-base-100' type='number' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="low" defaultChecked>Low</option>
                        <option value="meduim">Meduim</option>
                        <option value="high">High</option>
                   </select>
               </fieldset>

               </div>

            
              <fieldset className="fieldset ">
                   <legend className="fieldset-legend">Project name</legend>
                    <input type="text" className="input w-full" placeholder="Enter name of project" />
               </fieldset>

      </form>
            
      </div>
     

    </div>

      </div>
    
  )
}

export default CreateProject;