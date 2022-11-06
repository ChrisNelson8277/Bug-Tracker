import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: true,
    loggedIn: false,
  },
  reducers: {
    signIn: (state, action) => {
      const { name, password } = action.payload;
      state.loggedIn = true;
      state.admin = true;
      console.log(state.admin);
    },
    signOut: (state) => {
      state.loggedIn = false;
      state.admin = false;
    },
    createUser: (state, action) => {},
  },
});

export default authSlice.reducer;
export const { signIn, signOut, createUser } = authSlice.actions;
