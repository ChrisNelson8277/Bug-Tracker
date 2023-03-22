import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "projects",
  initialState: {
    list: undefined,
    projects: undefined,
  },
  reducers: {
    getProjects: (state) => {},
    setProjects: (state, action) => {
      state.list = {
        projects: action.payload.list,
      };
    },
    setCurrentProject: (state, action) => {
      state.projects = {
        current: action.payload,
      };
    },
  },
});
export default slice.reducer;
export const { getProject, setProjects, setCurrentProject } = slice.actions;
