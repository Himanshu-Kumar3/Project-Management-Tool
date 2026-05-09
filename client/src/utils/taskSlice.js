import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
      name : "task" ,
      initialState:{
            task: null, 
            tasks:[],
            projectTask : {},
      } ,
      reducers:{
            addTask(state , action){
                  state.task = action.payload
            },
            appendTask(state, action) {
      // Prevent duplicates
      const exists = state.tasks.some(t => t._id === action.payload._id);
      if (!exists) {
        state.tasks.push(action.payload);
      }
    },
    addTasks(state, action) {
      state.tasks = action.payload;
    },

    addProjectTask(state, action) {
      const { projectName, tasks } = action.payload;
      
      if (Array.isArray(tasks)) {
        // REPLACE the entire array to avoid duplicates
        state.projectTask[projectName] = [...tasks];
      } else {
        // For single task, add only if it doesn't exist
        if (!state.projectTask[projectName]) {
          state.projectTask[projectName] = [];
        }
        const exists = state.projectTask[projectName].some(t => t._id === tasks._id);
        if (!exists) {
          state.projectTask[projectName].push(tasks);
        }
      }
    },removeAllTasks(state , action){
                 state.tasks = [];
                 return
            },removeTasks(state, action) { // removeTask -> single task ko remove krta hai
      const { projectName, task } = action.payload;
      
      // Fix: Update the specific project's tasks, not the entire projectTask object
      if (projectName && state.projectTask[projectName]) {
        state.projectTask[projectName] = state.projectTask[projectName].filter(
          (projectTask) => projectTask._id !== task?._id
        );
      }
      
      // Remove from tasks array
      state.tasks = state.tasks.filter((t) => t._id !== task?._id);
      
      // Clear current task if it's the one being removed
      if (task?._id === state.task?._id) {
        state.task = null;
      }
    },
      }
      
});

export const {addTask, addTasks , appendTask,removeTasks , addProjectTask , removeAllTasks} = taskSlice.actions;
export default taskSlice.reducer;
