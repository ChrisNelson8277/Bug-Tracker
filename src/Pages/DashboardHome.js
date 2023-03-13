import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import Projects from "../Components/dashboard/Projects";
import AddProject from "../Components/Modals/AddProject";
import { Navigate } from "react-router-dom";
import { setProjects } from "../Slices/projectSlice";
import { getUser } from "../Slices/userSlice";
import { setUserTickets } from "../Slices/ticketSlice";

import logo from "../images/bug-tracker.png";
import { textAlign } from "@mui/system";

const DashboardHome = () => {
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ticketData, setTicketData] = useState(0);
  const { auth } = useSelector((state) => state);
  const { tickets } = useSelector((state) => state);
  const test = useSelector((state) => state);

  const dispatch = useDispatch();
  const fetchUsers = () => {
    fetch("http://localhost:5000/get/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        dispatch(getUser(data));
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const fetchTickets = () => {
    const author = auth.name;
    fetch("http://localhost:5000/get/userTickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        console.log(data.results);
        dispatch(setUserTickets(data.results));
        sortTickets(data.results);
      });
  };
  const sortTickets = (ticketss) => {
    console.log("attempting ticket sort", ticketss);
    let low = 0;
    let med = 0;
    let high = 0;
    let resolved = 0;
    let inProgress = 0;
    let open = 0;
    let newTick = 0;
    let issue = 0;
    let feature = 0;
    let other = 0;
    let bug = 0;
    for (let i = 0; i < ticketss.length; i++) {
      if (i + 1 == ticketss.length) {
        const data = {
          low: low,
          med: med,
          high: high,
          resolved: resolved,
          inProgress: inProgress,
          open: open,
          new: newTick,
          issue: issue,
          feature: feature,
          other: other,
          bug: bug,
        };
        setTicketData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
      if (ticketss[i].type === "bug") {
        bug = bug + 1;
      }
      if (ticketss[i].type === "feature request") {
        feature = feature + 1;
      }
      if (ticketss[i].type === "issue") {
        issue = issue + 1;
      }
      if (ticketss[i].type === "other") {
        other = other + 1;
      }
      if (ticketss[i].status === "Open") {
        open = open + 1;
      }
      if (ticketss[i].status === "resolved") {
        resolved = resolved + 1;
      }
      if (ticketss[i].status === "new") {
        newTick = newTick + 1;
      }
      if (ticketss[i].status === "inProgress") {
        newTick = newTick + 1;
      }
      if (ticketss[i].priority === "low") {
        low = low + 1;
      }
      if (ticketss[i].priority === "medium") {
        med = med + 1;
      }
      if (ticketss[i].priority === "high") {
        high = high + 1;
      }
    }
  };
  const fakeData = {
    High: 33,
    medium: 15,
    low: 10,
  };
  useEffect(() => {
    fetch("http://localhost:5000/get/allprojects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        const project = {
          list: data.results,
        };
        dispatch(setProjects(project));
        fetchUsers();
        fetchTickets();
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, [update]);
  if (auth.loggedIn === false) {
    return <Navigate to="/" replace />;
  }
  if (isLoading === true) {
    return <div>loading...</div>;
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "lightgray" }}>
      <div
        style={{
          backgroundColor: "#1976d2",
          padding: "1rem",
          position: "relative",
          display: "flex",
        }}
      >
        <img
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            marginBottom: "3vh",
          }}
          src={logo}
        ></img>
      </div>
      <div style={{ position: "relative", marginBottom: "40vh" }}>
        <Projects openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <div style={{}}>
        <Grid
          container
          columnSpacing={0}
          style={{
            justifyContent: "space-between",
            width: "80%",
            margin: "0 auto",
          }}
        >
          {/* Pie Chart 1 */}
          <Grid item xs={3.5} style={{ backgroundColor: "white" }}>
            <Typography
              variant="h5"
              align="left"
              p="1rem 1rem 0.3rem 1rem"
              style={{ borderBottom: "1px black solid", marginBottom: "1rem" }}
            >
              Tickets by Priority
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div></div>
              <PieChart
                style={{ height: "250px" }}
                label={({ dataEntry }) => dataEntry.value.toFixed(1) + "%"}
                labelStyle={(index) => ({
                  fill: "black",
                  fontSize: "7px",
                  fontFamily: "sans-serif",
                })}
                labelPosition={70}
                data={[
                  {
                    title: "Low",
                    value:
                      (ticketData.low /
                        (ticketData.low + ticketData.med + ticketData.high)) *
                      100,
                    color: "#FF0000",
                  },
                  {
                    title: "Med",
                    value:
                      (ticketData.med /
                        (ticketData.low + ticketData.med + ticketData.high)) *
                      100,
                    color: "#FFA500",
                  },
                  {
                    title: "High",
                    value:
                      (ticketData.high /
                        (ticketData.low + ticketData.med + ticketData.high)) *
                      100,
                    color: "#FFFF00",
                  },
                ]}
              />
              <div
                className="pie-list"
                style={{ display: "inline-block", margin: "1rem" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <ul
                    style={{
                      display: "inline-block",
                      textAlign: "left",
                    }}
                  >
                    <li
                      style={{
                        color: "#FFFF00",
                        padding: "0",
                      }}
                    >
                      low
                    </li>
                    <li style={{ color: "#FFA500" }}>Med</li>
                    <li style={{ color: "#FF0000" }}>High</li>
                  </ul>
                </div>
              </div>
            </div>
          </Grid>
          {/* Pie Chart 2 */}
          <Grid item xs={3.5} style={{ backgroundColor: "white" }}>
            <Typography
              variant="h5"
              align="left"
              p="1rem 1rem 0.3rem 1rem"
              style={{ borderBottom: "1px black solid", marginBottom: "1rem" }}
            >
              Tickets by Type
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 0.5rem ",
              }}
            >
              <PieChart
                style={{ height: "250px" }}
                label={({ dataEntry }) => dataEntry.value.toFixed(1) + "%"}
                labelStyle={(index) => ({
                  fill: "white",
                  fontSize: "7px",
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                })}
                labelPosition={70}
                data={[
                  {
                    title: "Issue",
                    value:
                      (fakeData.High /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#072F5F",
                  },
                  {
                    title: "Bug",
                    value:
                      (fakeData.medium /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#1261A0",
                  },
                  {
                    title: "Feature",
                    value:
                      (fakeData.low /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#3895D3",
                  },
                  {
                    title: "Other",
                    value:
                      (fakeData.low /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#58CCED",
                  },
                ]}
              />
              <div
                className="pie-list"
                style={{ display: "inline-block", margin: "1rem" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <ul
                    style={{
                      display: "inline-block",
                      textAlign: "left",
                    }}
                  >
                    <li
                      style={{
                        color: "#072F5F",
                        padding: "0",
                      }}
                    >
                      Issue
                    </li>
                    <li style={{ color: "#1261A0" }}>Bug</li>
                    <li style={{ color: "#3895D3" }}>Feature Req</li>
                    <li style={{ color: "#58CCED" }}>Other</li>
                  </ul>
                </div>
              </div>
            </div>
          </Grid>
          {/* Pie Chart 3 */}
          <Grid item xs={3.5} style={{ backgroundColor: "white" }}>
            <Typography
              variant="h5"
              align="left"
              p="1rem 1rem 0.3rem 1rem"
              style={{ borderBottom: "1px black solid", marginBottom: "1rem" }}
            >
              Tickets by Status
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <PieChart
                style={{ height: "250px" }}
                label={({ dataEntry }) => dataEntry.value.toFixed(1) + "%"}
                labelStyle={(index) => ({
                  fill: "black",
                  fontSize: "7px",
                  fontFamily: "sans-serif",
                })}
                labelPosition={70}
                data={[
                  {
                    title: "New",
                    value:
                      (fakeData.High /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#ADFF00",
                  },
                  {
                    title: "Open",
                    value:
                      (fakeData.medium /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#74D600",
                  },
                  {
                    title: "In Progress",
                    value:
                      (fakeData.low /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#00D27F",
                  },
                  {
                    title: "Resolved",
                    value:
                      (fakeData.low /
                        (fakeData.low + fakeData.medium + fakeData.High)) *
                      100,
                    color: "#00FF83",
                  },
                ]}
              />
              <div
                className="pie-list"
                style={{ display: "inline-block", margin: "1rem" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <ul
                    style={{
                      display: "inline-block",
                      textAlign: "left",
                    }}
                  >
                    <li
                      style={{
                        color: "#ADFF00",
                        padding: "0",
                      }}
                    >
                      New
                    </li>
                    <li style={{ color: "#74D600" }}>Open</li>
                    <li style={{ color: "#00D27F", fontSize: "1rem" }}>
                      In Progress
                    </li>
                    <li style={{ color: "#00FF83" }}>Resolved</li>
                  </ul>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {openModal === true ? (
        <AddProject setUpdate={setUpdate} setOpenModal={setOpenModal} />
      ) : null}
    </div>
  );
};

export default DashboardHome;
