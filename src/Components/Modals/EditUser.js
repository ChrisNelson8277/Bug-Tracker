import { React, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactDOM from "react-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const EditUser = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [number, setNumber] = useState("");
  const { auth } = useSelector((state) => state);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    setName(props.user.name);
    setEmail(props.user.email);
    setRole(props.user.role);
    setNumber(props.user.number);
  }, []);
  const handleChangeType = (event) => {
    setRole(event.target.value);
  };
  const submitButton = () => {
    if (auth.name === "Demo_Admin") {
      toast.error("Demo Users do not have that permission");
      return;
    }
    let updateUser = {
      name: name,
      role: role,
      id: props.user.id,
      number: number,
    };
    fetch("https://awful-teddy-clam.cyclic.app/update/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateUser,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        toast.success("User successfully updated!");
        props.setForceUpdate(Math.random());
        props.setOpenModal(false);
      })
      .catch((e) => {
        console.error(e.error);
      });
  };
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
  return ReactDOM.createPortal(
    <>
      <div style={Overlay}>
        <div style={Info_Style}>
          <div style={Container}>
            <Typography variant="h5" p="0" m="0">
              Edit User
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
              value={email}
              //   onChange={(e) => {
              //     setName(e.target.value);
              //   }}
              disabled
              id="outlined-required"
              label="E-mail"
              sx={{ width: "80%", marginTop: "3vh" }}
            />
            <TextField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              id="outlined-required"
              label="Name"
              sx={{ width: "80%", marginTop: "3vh" }}
            />
            <TextField
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              value={number}
              required
              id="outlined-required"
              label="Phone Number"
              sx={{ width: "80%", margin: "3vh 0" }}
            />
            <FormControl sx={{ width: "80%" }}>
              <InputLabel id="demo-simple-type-label">Role</InputLabel>
              <Select
                labelId="demo-simple-type-label"
                id="demo-simple-type"
                value={role}
                label="Role"
                onChange={handleChangeType}
                style={{ textTransform: "capitalize" }}
              >
                <MenuItem style={{ textTransform: "capitalize" }} value={role}>
                  {role}
                </MenuItem>
                {role !== "user" ? (
                  <MenuItem value={"user"}>User</MenuItem>
                ) : null}
                {role !== "developer" ? (
                  <MenuItem value={"developer"}>Developer</MenuItem>
                ) : null}
                {role !== "admin" ? (
                  <MenuItem value={"admin"}>Admin</MenuItem>
                ) : null}
              </Select>
            </FormControl>
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
                paddingBottom: "3vh",
              }}
            >
              <Button
                onClick={submitButton}
                variant="contained"
                sx={{ width: "80%" }}
              >
                Update User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditUser;
