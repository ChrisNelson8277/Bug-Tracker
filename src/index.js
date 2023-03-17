import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import projectReducer from "./Slices/projectSlice";
import ticketReducer from "./Slices/ticketSlice";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  projects: projectReducer,
  tickets: ticketReducer,
});
TimeAgo.addDefaultLocale(en);

const store = configureStore({
  reducer,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
