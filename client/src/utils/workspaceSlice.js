import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
      name :"workspace",
      initialState :null,
      reducers:{
            addWorkspace(state , action){
                  return action.payload;
            },
            removeWorkspace(state,action){
                  return null
            }
      }
})

export const {addWorkspace , removeWorkspace} = workspaceSlice.actions;
export default workspaceSlice.reducer;