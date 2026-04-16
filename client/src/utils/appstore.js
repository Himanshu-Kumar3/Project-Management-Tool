
import {configureStore}  from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import workspaceReducer from "./workspaceSlice";

const store = configureStore({
      reducer:{
            user : userReducer,
            workspace : workspaceReducer
      }

})

export default store;