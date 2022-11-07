import { Button, TextField, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import TransferList from "../dashboard/TransferList";

const AddProject = (props) => {
  const [worker, setWorker] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  console.log(name, description, worker);

  function closeModal() {
    props.setOpenModal(false);
  }
  function submitAddProject() {
    setName("");
    setDescription("");
    setWorker([]);
    props.setOpenModal(false);
  }
  const Info_Style = {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translate(-45%, -5%)",
    backgroundColor: "#FFF",
    padding: "1rem",
    zIndex: "100",
    width: "30%",
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
  const Container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  };
  const element = document.getElementById("portal");
  return ReactDOM.createPortal(
    <>
      <div style={Overlay}>
        <div style={Info_Style}>
          <div style={Container}>
            <Typography variant="h5" p="0" m="0">
              Add Project
            </Typography>
            <CloseIcon
              className="exit"
              onClick={() => {
                closeModal();
              }}
              fontSize="large"
            />
          </div>
          <div
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              id="outlined-required"
              label="Project Name"
              sx={{ width: "80%", marginTop: "3vh" }}
            />
            <TextField
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              required
              id="outlined-required"
              label="Project Description"
              sx={{ width: "80%", margin: "3vh 0" }}
            />
          </div>
          <TransferList setWorker={setWorker} />
          <div
            style={{
              width: "100%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "3vh",
            }}
          >
            <Button
              onClick={submitAddProject}
              variant="contained"
              sx={{ width: "80%" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AddProject;
