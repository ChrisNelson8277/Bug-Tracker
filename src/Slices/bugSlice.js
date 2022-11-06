import { createSlice } from "@reduxjs/toolkit";
import { retrieveBugs } from "../Controllers/bugController";
const slice = createSlice({
  name: "bug",
  initialState: [],
  reducers: {
    getBugs: (state) => retrieveBugs(),
    createBugs: () => {},
    updateBug: (state, action) => {},
    markComplete: (state, action) => {},
  },
});

export default slice.reducer;
export const { getBugs, createBugs, updateBug, markComplete } = slice.actions;
