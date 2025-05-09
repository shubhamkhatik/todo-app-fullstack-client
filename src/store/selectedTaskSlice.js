import { createSlice } from "@reduxjs/toolkit";

const selectedTaskSlice = createSlice({
  name: "selectedTask",
  initialState: null,
  reducers: {
    setSelectedTask: (_, action) => action.payload,
    clearSelectedTask: () => null,
  },
});

export const { setSelectedTask, clearSelectedTask } = selectedTaskSlice.actions;
export default selectedTaskSlice.reducer;
