
import Sidebar from '../components/Sidebar';
import MainComponent from '../components/MainComponent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addWorkspace } from '../utils/workspaceSlice';
const MainPage = () => {
  const workspace = useSelector(store => store.workspace?.workspace);
  const theme = useSelector(store => store.theme);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const getWorkspaceInfo = async()=>{
    try{
      if(workspace) return ;
      const res = await axios.get(BASE_URL + "/user/getWorkspace" , {withCredentials:true});
      
      dispatch(addWorkspace(res?.data?.data[0]));
    }catch(er){
    console.log(er?.message);
     if(er?.response?.status === 404){
      console.log(er?.response?.data?.message);
      navigate("/create-workspace");
     }

    }


  }

  useEffect(()=>{
  
    getWorkspaceInfo();

  
  },[])


  
  return (

    workspace && (<div data-theme={theme} className='flex overflow-hidden'>
      <Sidebar  />
      <MainComponent />
    </div>)
  )
}

export default MainPage;