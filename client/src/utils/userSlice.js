import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
      name :"user",
      initialState:null,
      reducers:{
            addUser(state , action){
                  return action.payload;
            },
            removeUser(state , action){
                  return null;
            },
            updateUser(state , action){
                  const {firstName , lastName} = action.payload;
                 return {
                      ...state,
                      firstName: firstName !== undefined ? firstName : state.firstName,
                      lastName: lastName !== undefined ? lastName : state.lastName,
                 };
            }
      }
})

export const {addUser , removeUser , updateUser} = userSlice.actions;
export default userSlice.reducer;