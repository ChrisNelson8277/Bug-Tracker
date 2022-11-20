import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import TransferTicket from "../viewproject/TicketTransfer";
import EditTransfer from "../viewproject/EditTransfer";

const EditTicket = (props) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState();
  const [assigned, setAssigned] = useState();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    return () => {
      setName(props.currentTicket.title);
      setDescription(props.currentTicket.description);
      setPriority(props.currentTicket.priority);
      setType(props.currentTicket.type);
      setStatus(props.currentTicket.status);
    };
  }, [update]);
  console.log(props.currentTicket);
  function closeModal() {
    props.setOpenModal(false);
  }
  function submitAddProject() {
    const information = {
      title: name,
      description: description,
      priority: priority,
      status: status,
      type: type,
      assignedTo: assigned,
      ticketId: props.currentTicket.ticket_id,
    };
    fetch("http://localhost:5000/edit/ticket", {
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
          props.setUpdate(Math.random());
          props.setOpenModal(false);
        }
        // props.setUpdate(Math.random());
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
              Edit Ticket
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
          <EditTransfer
            currentTicket={props.currentTicket}
            setAssigned={setAssigned}
          ></EditTransfer>
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

export default EditTicket;
