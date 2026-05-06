
import Sidebar from '../components/Sidebar';
import MainComponent from '../components/MainComponent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addWorkspace, addWorkspaces } from '../utils/workspaceSlice';
import { addUser } from '../utils/userSlice';
const MainPage = () => {
  const user = useSelector(store => store.user);
  const workspace = useSelector(store => store.workspace?.workspace);
  const theme = useSelector(store => store.theme);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUserAndWorkspace = async()=>{
    try{
      let currentUser = user;
      console.log("current User" , currentUser)
      if(!currentUser){
      try {
          const resUser = await axios.get(BASE_URL + "/user/getUser", { withCredentials: true });
          console.log("User data:", resUser.data);
          dispatch(addUser(resUser.data));
          currentUser = resUser.data;
        } catch (userError) {
          console.log("User not authenticated:", userError.response?.status);
          // If user is not authenticated, redirect to signup
          navigate("/Signup");
          return;
        }
      }


      // If current user exists :-
      try{
        const res = await axios.get(BASE_URL + "/user/getWorkspace", { withCredentials: true });
        console.log("Workspace data:", res.data.data);
        
        if (res.data.data && res.data.data.length > 0) {
          dispatch(addWorkspace(res.data.data[0]));
      }else {
          // No workspace found, redirect to create workspace
          navigate("/create-workspace");
        }
      }catch(workspaceError){
        console.log("Workspace error:", workspaceError.response?.status);
        if (workspaceError.response?.status === 401 || workspaceError.response?.status === 404) {
          navigate("/create-workspace");
        }


      }

    }catch(er){
      console.log(er.response);
      console.log("Error:", er);
      navigate("/Signup");
    }
  }

  useEffect(()=>{
  
    getUserAndWorkspace();

  
  },[])
       
  if(!user){
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

    if (!workspace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  
  return (

    workspace && (<div data-theme={theme} className='flex font-optical-sizing:auto'>
      <Sidebar  />
      <MainComponent />
    </div>)
  )
}

export default MainPage;