import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import LoginComponent from "./Components/login/LoginComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import ViewBug from "./Pages/ViewBug";
import DashboardHome from "./Pages/DashboardHome";
import SignUp from "./Components/login/SignUp";
import { useEffect } from "react";
import { signIn } from "./Slices/authSlice";
import ViewProject from "./Pages/ViewProject";
function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const isLoggedIn = window.localStorage.getItem("user");
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(signIn(JSON.parse(isLoggedIn)));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          index
          path="/"
          element={
            <>
              <LoginComponent />
            </>
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/home"
          element={
            <>
              <Sidebar>
                <DashboardHome />
              </Sidebar>
            </>
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/project/view/">
          <Route
            path=":id"
            element={
              <>
                <Sidebar>
                  <ViewProject />
                </Sidebar>
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
