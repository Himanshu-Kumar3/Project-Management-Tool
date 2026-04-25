import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
      name : "task" ,
      initialState:{
            task: null, 
            tasks:[]
      } ,
      reducers:{
            addTask(state , action){
                  state.task = action.payload
            }, appendTask(state , action){
                  state.tasks.push(action.payload);
            }, addTasks(state , action){
                  state.tasks = action.payload;
            },removeTask(state , action){
                  state.tasks.filter(task => !task.includes(action.payload))
            }
      }
      
});

export const {addTask, addTasks , appendTask , removeTask} = taskSlice.actions;
export default taskSlice.reducer;
