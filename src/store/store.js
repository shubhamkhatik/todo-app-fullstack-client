import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";
import selectedTaskReducer from "./selectedTaskSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    selectedTask: selectedTaskReducer,
  },
});

export default Store;
