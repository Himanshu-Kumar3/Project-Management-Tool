
import {configureStore}  from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import workspaceReducer from "./workspaceSlice";
import themeReducer from "./themeSlice";
import projectReducer from "./projectSlice";

const store = configureStore({
      reducer:{
            user : userReducer,
            workspace : workspaceReducer,
            project : projectReducer,
            theme : themeReducer
      }

})

export default store;