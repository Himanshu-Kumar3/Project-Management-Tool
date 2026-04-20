import { createSlice } from "@reduxjs/toolkit";


const projectSlice = createSlice({
      name :"project",
      initialState: {
            project : null , 
            projects : []
      },reducers:{
            addProject(state ,action ){
                  state.project = action.payload;
            },
            addprojects(state , action){
                  state.projects = action.payload;
            },
            appendProject(state , action){
                  state.projects.push(action.payload);
            },
            removeProject(state , action){
                  state.projects.filter((item)=> item !== action.payload);
            }
      }
});
export const {addProject , addprojects , appendProject, removeProject} = projectSlice.actions;
export default projectSlice.reducer;