import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const ProjectTask = ({currentProject , formatDate}) => {
  const navigate = useNavigate();
  const handleTaskClick = (task)=>{
    navigate("/project/task/"+ task._id)
    
  }
      
  return (
    <div>
      <div className='mt-8'>
            <div className="overflow-x-auto border rounded-sm border-gray-400 mt-8">
            <table className="table">
                {/* head */}
             <thead className='border-b border-gray-400  text-xs'>
                 <tr>
                <th>TITLE</th>
                <th>TYPE</th>
                <th>PRIORITY</th>
                <th>ASIGNEE</th>
                <th>DUE DATE</th>
                </tr>
              </thead>
   

              {currentProject.length > 0  ? (<tbody>
                 { currentProject.map(task => (
                  
           <tr key={task._id} onClick={()=>handleTaskClick(task)} className='cursor-pointer'>
                  <td className='hover:text-blue-500'>
                    {task.title}
                </td>
                 <td>
                    {task.category}
                 </td>
                 <td>{task.priority}</td>
                 <td>{task.assignedTo}</td>
                 <td>{formatDate(task.dueDate)}</td>
                </tr> 

                 ))}       
    </tbody>):(
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <p className='text-center font-semibold text-zinc-700'>No task found!</p>
                  </td>
                </tr>
              </tbody>
            )}
  </table>
</div>
            
      </div>
    </div>
  )
}

export default ProjectTask;