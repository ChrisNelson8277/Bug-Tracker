import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import ReactDOM from "react-dom";

const EditProject = () => {
  const Info_Style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(0%, -50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: "100",
  };
  const Overlay = {
    position: "fixed",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    height: "100%",
    width: "100%",
    backgroundColor: "#1b1c1e95",
    zIndex: "99",
  };
  const element = document.getElementById("portal");
  return ReactDOM.createPortal(
    <>
      <div style={Overlay}>
        <div style={Info_Style}>EditProject</div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditProject;
