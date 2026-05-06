import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addTask } from '../utils/taskSlice';

const TaskPage = () => {
      const {taskId} = useParams();
      const dispatch = useDispatch();

      const formatDate = (dateString) => {
       const date = new Date(dateString);
       const day = date.getDate();
       const month = date.toLocaleString('default', { month: 'short' });
       const year = date.getFullYear();
       return `${day} ${month}, ${year}`;
      };

      const {task} = useSelector(store => store.task);
      const getTaskInfo = async()=>{
            try{

                  const res = await axios.post(BASE_URL+"/project/getTask/"+taskId , {} , {withCredentials:true});

                  console.log(res.data.data);
                  dispatch(addTask(res.data.data));
            
            }catch(er){
                  console.log(er.message)
            }
      }

      useState(()=>{
            getTaskInfo();

      },[]);

      if(!task) return;
      console.log("TASK",task)

  return (
    task && <div className='pl-10 pr-8 pb-10 pt-4 '>
      <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>{task.title.toUpperCase()}</h1>
            <div className='my-4 flex justify-end'>
                 <button className='btn bg-red-700 hover:bg-base-300 shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2   mr-4 ' >Delete Task</button>
               <button   className='btn bg-blue-500  text-white shadow-xs  border border-gray-300 rounded-sm text-sm font-semibold cursor-pointer px-3 py-2'>Task Completed</button>

               </div>
      </div>

<div className='flex justify-center mt-10 items-center w-full'>
      <div className='border border-gray-400 px-5 py-6 mt-4 rounded-md w-[50%]'>
            <h2 className='font-semibold'>
                  {task.title.toUpperCase()}
            </h2>

            <ul className='flex mt-4 items-baseline'>
                  <li className='px-3 py-1 mr-2 rounded-sm bg-gray-300 text-black text-xs '>{task.category.toUpperCase()}</li>
                  <li className='px-3 py-1 mr-2 rounded-sm bg-blue-300 text-black text-xs'>{task.priority.toUpperCase()}</li>
                  <li className='px-3 py-1 mr-2 rounded-sm bg-emerald-400 text-black text-xs '>{task.status.toUpperCase()}</li>
            </ul>

            <p className='text-sm text-gray-400 mt-3 pl-2'>{task.discription}</p>

            <div className='flex justify-between mt-4 rounded-md items-center py-2 px-3 bg-base-300 text-content-200'>
                  <h2 className='font-semibold'>{task.assignedTo}</h2>
                  <p className='font-semibold'>{formatDate(task.dueDate)}</p>
            </div>

      </div>

</div>
      

    </div>
  )
}

export default TaskPage;
