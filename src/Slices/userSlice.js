import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
  },
  reducers: {
    getUser: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});
export default slice.reducer;
export const { getUser } = slice.actions;
