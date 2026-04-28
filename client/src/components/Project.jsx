import React, { useState } from 'react'
import CreateTask from './CreateTask';
import { useSelector } from 'react-redux';

const Project = () => {
      const {project} = useSelector(store => store.project)
      const {task} = useSelector(store => store.task);
      const [isCreateProject , setIsCreateproject] = useState(false);


 if(!project) return;
 console.log(task)

  return (
    <div className='p-8'>
      <div className='flex justify-between'>
            <div className='flex items-baseline'>
            <span className='mr-6 hover:bg-base-200'><i className="fa-solid fa-arrow-left"></i></span>
            <h2 className='text-lg font-bold'>{project?.name}</h2>
            </div>
            <button className='bg-blue-500 text-white px-3 py-2 text-sm rounded-sm shadow-md cursor-pointer' onClick={()=> setIsCreateproject(true)}><i className="fa-solid fa-plus"></i> New Task</button>
      </div>

      <div className='grid grid-cols-4 gap-2 md:flex md:flex-wrap  '>
            <div className='w-50 border border-gray-400 rounded-sm p-2 mt-10 md:mr-3'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>Total task</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-2 text-2xl font-bold'>{0} </p>
            </div>
            <div className='w-50 border border-gray-400 rounded-sm p-2 md:mr-3 mt-10'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>Completed</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='#50C878'><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-2 text-2xl font-bold text-emerald-500'>{0} </p>
            </div>
            <div className='w-50 border border-gray-400 rounded-sm p-2 md:mr-3 mt-10'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>In progress</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='#F05E1B'><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-2 text-2xl font-bold text-amber-500'>{0} </p>
            </div>
            <div className='w-50 border border-gray-400 rounded-sm p-2 mt-10'>
                  <div className='flex justify-between'>
                     <p className='text-sm font-semibold'>Team Member</p>
                     <span className='text-black'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='#0000FF'><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg></span>
                  </div>
                  <p className='py-1 text-2xl font-bold text-blue-500'>{0} </p>
            </div>
      </div>

      <div className='mt-8 border border-gray-400   w-63 rounded-sm'>
            <button className=' py-2 px-3 pr-5 text-xs hover:bg-base-300'>
                  <i className="fa-solid fa-chart-gantt"></i>   Task
            </button>
            <button className='py-2 px-3 text-xs hover:bg-base-300'>
                <i className="fa-regular fa-calendar"></i>  Calender
            </button>
            <button className='py-2 px-3 text-xs hover:bg-base-300'>
                 <i className="fa-solid fa-gear"></i> Settings
            </button>
            
      </div>
      
      <div className='mt-8'>
            <div className='text-xs font-semibold'>
                  <select className='px-3 py-2 border mr-4 border-gray-400 rounded-sm' >
                        <option value="All Status">All Status</option>
                        <option value="to do">To Do</option>
                        <option value="in progress">In Progress</option>
                        <option value="done"> Done</option>

                  </select>
                  <select className='px-3 py-2 border mr-4 border-gray-400 rounded-sm' >
                        <option value="All Types">All Types</option>
                        <option value="task">Task</option>
                        <option value="bug">Bug</option>
                        <option value="feature"> Feature</option>
                        <option value="impovement"> Improvement</option>

                  </select>
                  <select className='px-3 py-2 border border-gray-400 rounded-sm' >
                        <option value="All Status">All Priorities</option>
                        <option value="Low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="High"> High</option>
                  </select>
            </div>

            <div className="overflow-x-auto border rounded-sm border-gray-400 mt-8">
            <table className="table">
                {/* head */}
             <thead className='border-b border-gray-400  text-xs'>
                 <tr>
                 <th>
                 <label>
                    <input type="checkbox" className="checkbox" />
                 </label>
                </th>
                <th>TITLE</th>
                <th>TYPE</th>
                <th>PRIORITY</th>
                <th>ASIGNEE</th>
                <th>DUE DATE</th>
                </tr>
              </thead>
   

              {task && (<tbody>
               {/* row 1 */}
                 <tr>
                  <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                   </label>
                 </th>
                  <td>
                    {task.title}
                </td>
                 <td>
                    {task.type}
                 </td>
                 <td>{task.priority}</td>
                 <td>{task.asignee}</td>
                 <td>{task.dueDate}</td>
                </tr>
               {/* row 2 */}
       
    </tbody>)}
  </table>

  {!task && <p className='mt-4 text-center font-semibold text-zinc-700 pb-3'>No task found!</p>}
</div>
            
      </div>

      {isCreateProject && <CreateTask data={project} onclose={()=>setIsCreateproject(false)}/>}
    </div>
  )
}

export default Project;