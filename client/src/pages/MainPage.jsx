
import Sidebar from '../components/Sidebar';
import MainComponent from '../components/MainComponent';
import {  useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import useUserAndWorkspace from '../utils/customHooks/useUserAndWorkspace';
const MainPage = () => {
  const user = useSelector(store => store.user);
  const workspace = useSelector(store => store.workspace?.workspace);
  const theme = useSelector(store => store.theme);
  const getUserAndWorkspace = useUserAndWorkspace(user);

  
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