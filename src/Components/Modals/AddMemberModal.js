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
import AddMember from "../viewproject/AddMember";
import { toast } from "react-toastify";

const AddMemberModal = (props) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState();
  const [assigned, setAssigned] = useState();
  const { auth } = useSelector((state) => state);
  const { projects } = useSelector((state) => state);
  const assignedMembers = JSON.parse(projects.projects.current.assignedto);
  function closeModal() {
    props.setOpenModal(false);
  }
  console.log(assigned);
  function submitAddProject() {
    const information = {
      id: props.currentProject[0].id,
      assignedTo: assigned,
    };
    fetch("http://localhost:5000/update/projectUsers", {
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
          props.setOpenMemberModal(false);
          props.setUpdate(Math.random());
          toast.success("Member(s) added to project");
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
    top: "25%",
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
              Add/Remove Members
            </Typography>
            <CloseIcon
              className="exit"
              onClick={() => {
                props.setOpenMemberModal(false);
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
              padding: "2rem 0",
            }}
          ></div>
          <AddMember
            assignedMembers={assignedMembers}
            setAssigned={setAssigned}
            currentProject={props.currentProject}
          />
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

export default AddMemberModal;
