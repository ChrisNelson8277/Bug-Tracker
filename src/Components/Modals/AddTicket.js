import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import TransferTicket from "../viewproject/TicketTransfer";
import { toast } from "react-toastify";

const AddTicket = (props) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState();
  const [assigned, setAssigned] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { auth } = useSelector((state) => state);

  function closeModal() {
    props.setOpenModal(false);
  }
  function submitAddProject() {
    if (auth.name === "Demo_Admin") {
      toast.error("Demo Users do not have permission");
      return;
    }
    if (
      name === "" ||
      description === "" ||
      type === "" ||
      priority === "" ||
      status === ""
    ) {
      toast.error("Please Fill Out All Fields!");
      return;
    }
    const information = {
      title: name,
      author: auth.name,
      description: description,
      priority: priority,
      status: status,
      type: type,
      id: props.currentProject[0].id,
      projectName: props.currentProject[0].name,
      assignedTo: assigned,
    };
    fetch("https://awful-teddy-clam.cyclic.app/add/ticket", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        information,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        if (data.code === 200) {
          props.setOpenModal(false);
          props.setUpdate(Math.random());
        }
        //
        // props.setOpenModal(false);
      })
      .catch((e) => {
        console.error(e.error);
      });
    // setName("");
    // setDescription("");
    // setWorker([]);
    // props.setOpenModal(false);
  }
  const Info_Style = {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translate(-25%, -5%)",
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
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };
  const element = document.getElementById("portal");
  return ReactDOM.createPortal(
    <>
      <div style={Overlay}>
        <div style={Info_Style}>
          <div style={Container}>
            <Typography variant="h5" p="0" m="0">
              Add Ticket
            </Typography>
            <CloseIcon
              className="exit"
              onClick={() => {
                props.setOpenModal(false);
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
              label="Title"
              sx={{ width: "80%", marginTop: "3vh" }}
            />
            <TextField
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              required
              id="outlined-required"
              label="Description"
              sx={{ width: "80%", margin: "3vh 0" }}
            />
          </div>
          {/* <TransferList setWorker={setWorker} /> */}
          <TransferTicket setAssigned={setAssigned} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              margin: "0 auto",
            }}
          >
            <FormControl sx={{ width: "25%" }}>
              <InputLabel id="demo-simple-type-label">Type</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-type-label"
                id="demo-simple-type"
                value={type}
                label="Type"
                onChange={handleChangeType}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"issue"}>issue</MenuItem>
                <MenuItem value={"bug"}>bug</MenuItem>
                <MenuItem value={"feature request"}>feature request</MenuItem>
                <MenuItem value={"other"}>other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "25%" }}>
              <InputLabel id="demo-simple-priority-label">Priority</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-priority-label"
                id="demo-simple-priority"
                value={priority}
                label="Priority"
                onChange={handleChangePriority}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"low"}>low</MenuItem>
                <MenuItem value={"medium"}>medium</MenuItem>
                <MenuItem value={"high"}>high</MenuItem>
                <MenuItem value={"immediate"}>immediate</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "25%" }}>
              <InputLabel id="demo-simple-status-label">Status</InputLabel>
              <Select
                defaultValue=""
                labelId="demo-simple-status-label"
                id="demo-simple-status"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"New"}>New</MenuItem>
                <MenuItem value={"Open"}>Open</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Resolved"}>Resolved</MenuItem>
              </Select>
            </FormControl>
          </div>
          {error ? (
            <div
              style={{
                width: "100%",
                color: "red",
                marginTop: "1vh",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {errorMessage}
            </div>
          ) : null}
          <div
            style={{
              width: "100%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1vh",
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

export default AddTicket;
