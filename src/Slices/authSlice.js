import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "",
    loggedIn: false,
    name: "",
  },
  reducers: {
    signIn: (state, action) => {
      const { name, role } = action.payload;
      state.loggedIn = true;
      state.role = role;
      state.name = name;
      let userInfo = {
        loggedIn: state.loggedIn,
        role: state.role,
        name: state.name,
      };
      if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(userInfo));
      }
    },
    signOut: (state) => {
      state.loggedIn = false;
    },
    createUser: (state, action) => {},
  },
});

export default authSlice.reducer;
export const { signIn, signOut, createUser } = authSlice.actions;
