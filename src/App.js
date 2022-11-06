import { useSelector } from "react-redux";
import "./App.css";
import LoginComponent from "./Components/login/LoginComponent";
import { Route, Router } from "react-router";
import Sidebar from "./Components/Sidebar";
import ViewBug from "./Pages/ViewBug";
import DashboardHome from "./Pages/DashboardHome";
function App() {
  const { auth } = useSelector((state) => state);
  console.log(auth);

  return (
    <div className="App">
      {!auth.loggedIn ? (
        <LoginComponent />
      ) : (
        <Sidebar>
          <DashboardHome />
        </Sidebar>
      )}
    </div>
  );
}

export default App;
