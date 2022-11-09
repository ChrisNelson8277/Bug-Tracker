import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import bugReducer from "./Slices/bugSlice";
import userReducer from "./Slices/userSlice";
import projectReducer from "./Slices/projectSlice";
import { BrowserRouter } from "react-router-dom";

const reducer = combineReducers({
  auth: authReducer,
  bug: bugReducer,
  user: userReducer,
  projects: projectReducer,
});

const store = configureStore({
  reducer,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
