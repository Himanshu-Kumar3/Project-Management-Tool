import React, { useState } from 'react'

const CreateTask = ({data , onclose}) => {
      const [title , setTitle] = useState("");
      const [discription , setDiscription] = useState("");
      const [type , setType] = useState("");
      const [priority , setPriority] = useState("");
      const [asignee , setAsignee] = useState("");
      const [status , setStatus] = useState("");
      const [dueDate , setDuedate] = useState("");
      const [error , setError] = useState(null);

      const handleCancel =()=>{
            onclose();
      }

  return (
    <div className='z-50 fixed overflow-auto scrollbar-hide inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-start '>
      <div className='overflow-y-auto mt-6 border border-gray-500 scrollbar-hide bg-white text-black shadow-md rounded-md w-[35%] px-6 pt-4'>
           <h1 className='font-semibold'>Create New Task</h1> 
           <form onSubmit={(e)=> e.preventDefault()} className='w-full text-black'>
             <fieldset className="fieldset text-black  ">
                   <legend className="fieldset-legend text-black ">Title</legend>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="px-3 py-2 border border-gray-400 rounded-sm w-full" placeholder="Enter name of project" />
               </fieldset>
                <fieldset className="fieldset">
                   <legend className="fieldset-legend text-black text-xs">Discription</legend>
                   <textarea className="textarea bg-white border border-gray-400  w-full" value={discription} onChange={(e)=> setDiscription(e.target.value)}  placeholder="Bio"></textarea>
              </fieldset>

              <div className='grid grid-cols-2 gap-4'>
             <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs">Status</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="to do" defaultChecked>To Do</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                   </select>
               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs ">Priority</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={priority} onChange={(e)=>setPriority(e.target.value)}>
                         <option value="medium"defaultChecked>Medium</option>
                        <option value="low" >Low</option>
                        <option value="high">High</option>
                   </select>
               </fieldset>

               </div>


               <div className='grid grid-cols-2 gap-4'>
              <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs ">Asignee</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' >
                        <option value="planning" defaultChecked>No Asignee</option>
                        {/* <option value={user?.data.emailId}>{user?.data.emailId}</option> */}
                   </select>
               </fieldset>
               
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs">Type</legend>
                   <select className='px-3 py-2 border border-gray-400 rounded-sm' type='number' value={type} onChange={(e)=>setType(e.target.value)}>
                         <option value="Feature"defaultChecked>Feature</option>
                        <option value="bug" >Bug</option>
                        <option value="improvement">Improvement</option>
                        <option value="others" >Others</option>

                   </select>
               </fieldset>
               </div>
               <fieldset className="fieldset ">
                   <legend className="fieldset-legend text-black text-xs">Due Date</legend>
                   <input type='date' value={dueDate} onChange={(e)=> setDuedate(e.target.value)} className='px-3 py-2 border text-black border-gray-400 rounded-sm'/>
               </fieldset>

               {error &&  <p className='text-xs text-red-500'>{error}</p>}


               <div className='my-4 flex justify-end'>
                 <button className='bg-gray-100 hover:bg-gray-300 shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2   mr-4 ' onClick={handleCancel}>Cancel</button>
               <button   className='bg-blue-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2'>Create Task</button>

               </div>
           </form>
      </div>
    </div>
  )
}

export default CreateTask;