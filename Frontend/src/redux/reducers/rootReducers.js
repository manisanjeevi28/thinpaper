import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "../task/taskReducer";
import userReducer from "../user/userReducer";

const rootReducers = combineReducers({
  userReducer,
  taskReducer
});

export default rootReducers;