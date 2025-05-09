import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
