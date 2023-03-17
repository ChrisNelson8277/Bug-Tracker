import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../Slices/authSlice";
import { useNavigate } from "react-router";

const drawerWidth = 240;
const Sidebar = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const logout = (text) => {
    dispatch(signOut());
    localStorage.removeItem("user");
  };
  return (
    <Box sx={{ display: "flex", fontFamily: "'Oswald', sans-serif" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          Welcome! {auth.name ? <>{auth.name.split(" ")[0]}</> : "User"}
          <br />
          {auth.role ? <>Role: {auth.role}</> : "N/A"}
        </Toolbar>
        <Divider />
        <List>
          {/* {[
            "Dashboard Home",
            "Manage Role Assignment",
            "Manage Project Users",
            "Tickets",
          ]} */}
          <ListItem disablePadding>
            <ListItemButton
              style={{ fontFamily: "'Oswald', sans-serif" }}
              onClick={() => {
                navigate("/home");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard Home"} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage Role Assignment"} />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding>
            {auth.role === "admin" ? (
              <ListItemButton
                onClick={() => {
                  navigate("/manage-users");
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"Manage Users"} />
              </ListItemButton>
            ) : null}
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/tickets");
              }}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary={"Tickets"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => {
                logout();
              }}
            >
              <ListItemButton style={{ color: "red" }}>
                <ListItemIcon>
                  <LogoutIcon style={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Sidebar;
