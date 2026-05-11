import axios from "axios";
import { useEffect } from "react"
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { addWorkspace } from "../workspaceSlice";
import Workspaces from "../../components/Workspaces";


const useUserAndWorkspace = (user)=>{
      const dispatch = useDispatch();
      const navigate = useNavigate()


      useEffect(()=>{
              getUserAndWorkspace();
      } , []);

     const  getUserAndWorkspace = async()=>{
            try{
                  let currentUser = user;
                  if(!currentUser){
                        try {
                          const resUser = await axios.get(BASE_URL + "/user/getUser", { withCredentials: true });
                         
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
              console.log(er.message);
               navigate("/Signup");
            }

      }

      return 

}

export default useUserAndWorkspace;