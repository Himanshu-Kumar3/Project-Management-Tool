import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';

const Team = () => {

  const user = useSelector(store => store.user);
  const {workspace}= useSelector(store => store.workspace);
  const {projects} = useSelector(store=> store.project);
  const {tasks} = useSelector(store=> store.task);
  const userData = user.data;
  const [isAddMember , setIsAddmember] = useState(false);
  const [memberEmail , setMemberEmail] = useState('');
  const [error , setError] = useState('');
  const [isToast , setIsToast] = useState(false);
  const status = 'sent';

  

  const  admin = (workspace.ownerId === userData._id)? userData : null;

  const handleAddMember = async()=>{
    try{
      const res = await axios.post(BASE_URL +"/sendConnection/"+status + "/"+ workspace._id , {toUserEmail :memberEmail} , {withCredentials:true});
      console.log(res.data.message)
      setIsToast(true);
     setTimeout(()=>{
      setIsToast(false);
      setIsAddmember(false);
   
     } , 2000);

    }catch(er){
      console.log(er.response)
      // setError(er.response.message.data)

    }
  }

  if(!userData) return ;
  console.log(userData)

  const teamMember = workspace.members;

  const activeProjects = projects.filter(project => project.status === 'active');
  
  return (
    <div className='ml-2 pl-10 pr-8 py-6'>
      <div className='flex w-full justify-between items-center px-1 '>
        <div className='title'>
         <h2 className='font-bold text-2xl'>Team</h2>
         <p className='text-sm text-zinc-600' >Manage team members and their contributions</p>
       </div>
       <button type='button' className='text-sm h-8 px-2 text-white rounded-xs shadow-sm cursor-pointer bg-blue-500 pr-3' onClick={()=>setIsAddmember(true)} ><i className="fa-solid fa-user-plus"></i> Invite Member</button>
     </div>


     {/* List of the ovreview */}
    <div className='overview grid md:grid-cols-5  my-8  md:gap-6'>
     <div className='box rounded-md border p-4  py-3 bg-base-100 justify-between  border-gray-300 flex'>
          <div className='totalProject '>
            <h2 className='text-sm text-base-content/70'>Total Members</h2>
            <p className='text-3xl font-bold text-blue-500'>{teamMember.length + 1}</p>
          </div>

          <span className='folder bg-blue-500/10 p-1 px-2 h-8  rounded-md'>
            <i className="fa-solid fa-user-group text-blue-500"></i>
          </span>
        </div>


        <div className='box rounded-md border p-4  py-3 bg-base-100 justify-between  border-gray-300 flex'>
          <div className='totalProject '>
            <h2 className='text-sm text-base-content/70'>Active projects</h2>
            <p className='text-3xl font-bold text-emerald-500'>{activeProjects.length}</p>
          </div>

          <span className='folder bg-emerald-500/10 p-1 px-2 h-8  rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#50C878"><path d="M326-171q-15-11-22-28l-92-241H40v-80h228l92 244 184-485q7-17 22-28t34-11q19 0 34 11t22 28l92 241h172v80H692l-92-244-184 485q-7 17-22 28t-34 11q-19 0-34-11Z"/></svg>
          </span>
        </div>


        <div className='box rounded-md border p-4  py-3 bg-base-100 justify-between  border-gray-300 flex'>
          <div className='totalProject '>
            <h2 className='text-sm text-base-content/70'>Total Tasks</h2>
            <p className='text-3xl font-bold text-purple-500'>{tasks.length}</p>
          </div>

          <span className='folder bg-purple-500/10 p-1 px-2 h-8  rounded-md'>
            <i className="fa-solid fa-shield text-purple-500"></i>
          </span>
        </div>

    </div>



{/* table  */}
      <div className="overflow-x-auto border rounded-sm w-180 border-gray-400 mt-8">
      <table className=' text-sm w-full '>
        <thead className='py-2 bg-base-300' >
          <tr className=''>
            <td className='font-semibold pl-4 py-3'>Email</td>
            <td className='font-semibold'>Role</td>
          </tr>
        </thead>
        <tbody className='text-sm '>
          <tr>
            <td className='text-gray-600 pl-4 pb-3 pt-3 tracking-wide'> {admin.emailId}</td>
            <td><span className='text-purple-500 bg-purple-500/10 px-1 rounded-lg'>Owner</span></td>
          </tr>
          {teamMember.map((member)=><tr key={member._id}>
            <td className='text-gray-600  pl-4 pb-3 tracking-wide'> {member.memberId}</td>
            <td><span className='text-purple-500 bg-purple-500/10 px-1 rounded-lg'>{member.role}</span></td>
          </tr> )}


        </tbody>
      </table>

      </div>
      {isAddMember && <div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 flex justify-center items-center overflow-hidden z-10 border border-gray-300'>
        <div className='bg-white w-[30%] rounded-md px-4 py-4'>
          <h1 className='font-semibold text-lg text-black'>Add Member to Workspace</h1>
          <p className='text-sm text-black '>Adding to workspace : <span className='text-blue-500'>{workspace.name || " "}</span></p>

         <fieldset className="fieldset mt-3">
         <legend className="fieldset-legend text-black">Member Email :</legend>
         <input type="text" placeholder='Enter email' className='px-3 py-2 border border-gray-400 text-black rounded-sm w-full ' value={memberEmail} onChange={(e)=>setMemberEmail(e.target.value)} />
          </fieldset>
          

          <div className='mt-10 mb-2 flex justify-end'>
            <button onClick={()=>setIsAddmember(false)} className='border  border-gray-300 px-3 py-2 mr-2 font-semibold rounded-md hover:bg-base-300 shadow-sm cursor-pointer text-gray-500'>Cancel</button>
            <button  className='border border-gray-300 px-3 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm cursor-pointer hover:text-gray-300' onClick={handleAddMember}>Add Member</button>
          </div>

        </div>
        { isToast && <div className="toast toast-top toast-center">
      <div className="alert alert-success">
         <span>Invite Sent Sucessfuly.</span>
      </div>
    </div>}
      </div>}


      

    </div>
  )
}

export default Team;