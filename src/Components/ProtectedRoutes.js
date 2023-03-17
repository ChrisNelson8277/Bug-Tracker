import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import LoginComponent from "./login/LoginComponent";

const ProtectedRoutes = () => {
  const { auth } = useSelector((state) => state);
  return auth.loggedIn ? <Outlet /> : <LoginComponent />;
};

export default ProtectedRoutes;
