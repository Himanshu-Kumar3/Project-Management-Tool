import React from 'react'
import { useState  } from 'react';
import { BASE_URL} from "../utils/constants";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {useNavigate} from "react-router-dom";

const Signup = () => {


  const dispatch = useDispatch();
  const [isSignIn , setIsSignIn] = useState(false);
  const [errorMessage , setErrorMessage] = useState("");
  const [firstName,setFirstName] = useState("Samir");
  const [lastName , setLastName] = useState("Kumar");
  const [emailId , setEmail] = useState("samir23@gmail.com");
  const [password ,setPassword]= useState("Samir@123");
  const navigate = useNavigate();

 



  const handleToggleForm = ()=>{
   setIsSignIn(!isSignIn);
  }

  const handleSignupLogin= async()=>{
    try{
      if(isSignIn === false){
        const res = await axios.post(BASE_URL + "/signup" , {
          firstName , lastName , emailId , password 
        } ,{withCredentials:true});

       
        dispatch(addUser(res.data));
         navigate("/main");
      }else{
        const res = await axios.post(BASE_URL + "/login" ,{emailId , password } ,{withCredentials:true});
        
        dispatch(addUser(res.data));
         navigate("/main");
      }
    }catch(er){
      console.log(er?.response?.data?.message)
      setErrorMessage(er?.response?.data?.message);
      
    }
  }
  return (
<div >
      <div className="backgroundImage absolute ">
         <img className="bgImage h-screen w-screen object-cover" src="image.png" alt="Background-logo" />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className=" SignIn-form absolute  bg-[rgba(0,0,0,0.8)] p-4  mx-auto left-0 right-0 top-[13%] w-[70%] xs:w-[70%] sm:w-[50%] md:w-[33%]  flex flex-col items-center flex-wrap rounded-lg  " >
      <h2 className="text-white self-start text-3xl font-semibold pl-10 py-1 ">{isSignIn ? "Sign In" : "Sign Up"}</h2>
      {!isSignIn && <input
      onChange={(e)=>setFirstName(e.target.value)}
      value={firstName}
       className="firstName  my-2 p-2 m-2 w-4/5 rounded-sm text-white bg-gray-700"
        placeholder="firstName" 
        type="text"
        />}

       {!isSignIn && <input
       onChange={(e)=>setLastName(e.target.value)}
       value={lastName}
       className="lastName  my-2 p-2 m-2 w-4/5 rounded-sm text-white bg-gray-700"
        placeholder="lastName" 
        type="text"
        />}
        <input
        onChange={(e)=>setEmail(e.target.value)}
        value={emailId}
         className="Email  p-2 m-2 my-2 w-4/5 rounded-sm text-white bg-gray-700" 
         placeholder="Enter Email" 
         type="email"
         />
         <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          className="password text-white my-2 p-2 m-2 w-4/5 rounded-sm bg-gray-700" 
          placeholder="Enter Password" 
          type="text"
          />

          <p className="ErrorMessage text-xs pt-1 text-red-500">{errorMessage}</p>
         <button
          className="SignInSignUpButton text-white w-4/5 bg-red-700 p-2 my-5 text-center text-lg rounded-md active:bg-red-900 cursor-pointer"
          onClick={handleSignupLogin}
          >{isSignIn ? "Sign In" : "Sign Up"}
          </button>

         <p 
         className="SignInSignUpToggle text-white font-semibold cursor-pointer underline hover:text-gray-400 py-4"
           onClick={handleToggleForm}
           >{isSignIn ? "New user ? Sign Up" : "Already Registered ? Sign In Now"}
            </p>

      </form>
    </div>
    
  )
}

export default Signup;