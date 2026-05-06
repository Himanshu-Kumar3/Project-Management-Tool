import React from 'react'
import Invite from './Invite';
import  { useEffect , useState } from 'react'
import { BASE_URL } from '../Utils/constants';
import axios from 'axios';
const Invites = () => {
      // const {connections} = 
       const [connectionUsers , setConnectionUser] = useState("");
      
            const getConnection = async ()=>{
            try{
            const res = await axios.get(BASE_URL + "/getConnection" , {withCredentials:true});
            console.log(res.data)
            setConnectionUser(res?.data?.data)
         }catch(er){
                  console.log(er?.response.message.data);
            }  
      }


      useEffect(()=>{
            getConnection();
      },[]);


     if(!connectionUsers) return;

     if(connectionUsers.length === 0){
     return  <h1 className='flex justify-center my-8 font-bold'> No Connection Found !</h1>
     }

  return (
    <div>
      <h1 className=' text-center font-bold text-2xl my-4'> ✨ Invitations</h1>
     {connectionUsers && <div className='flex flex-col items-center'>
            {connectionUsers.map(user => <Invite key={user._id} user={user}/>)}
            
      </div>}
    </div>
  )
  
}

export default Invites;



