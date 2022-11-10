import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import Projects from "../Components/dashboard/Projects";
import AddProject from "../Components/Modals/AddProject";
import { Navigate } from "react-router-dom";
import { setProjects } from "../Slices/projectSlice";

const DashboardHome = () => {
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
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
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
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
      <Typography
        align="left"
        variant="h5"
        style={{
          backgroundColor: "#1e81b0",
          padding: "1rem",
          height: "10rem",
          position: "relative",
        }}
      >
        Dashboard
      </Typography>
      <div style={{ position: "relative", marginBottom: "40vh" }}>
        <Projects openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <Grid
        container
        columnSpacing={0}
        style={{
          justifyContent: "space-between",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Grid item xs={3.5} style={{ backgroundColor: "white" }}>
          <Typography variant="h5" align="left" p="1rem">
            Tickets by type
          </Typography>
          <PieChart
            style={{ height: "300px" }}
            label={({ dataEntry }) =>
              dataEntry.title + " " + dataEntry.value + "%"
            }
            labelStyle={(index) => ({
              fill: "black",
              fontSize: "7px",
              fontFamily: "sans-serif",
            })}
            labelPosition={50}
            data={[
              { title: "High", label: "test", value: 10, color: "#FF0000" },
              { title: "Med", value: 15, color: "#FFA500" },
              { title: "low", value: 20, color: "#FFFF00" },
            ]}
          />
        </Grid>
        <Grid
          item
          xs={3.5}
          style={{
            backgroundColor: "white",
          }}
        >
          <Typography p="1rem" variant="h5" align="left">
            Tickets by type
          </Typography>
          <PieChart
            style={{ height: "300px" }}
            label={({ dataEntry }) =>
              dataEntry.title + " " + dataEntry.value + "%"
            }
            labelStyle={(index) => ({
              fill: "black",
              fontSize: "7px",
              fontFamily: "sans-serif",
            })}
            labelPosition={60}
            data={[
              { title: "High", label: "test", value: 10, color: "#FF0000" },
              { title: "Med", value: 15, color: "#FFA500" },
              { title: "low", value: 20, color: "#FFFF00" },
            ]}
          />
        </Grid>
        <Grid item xs={3.5} p="1rem 0" style={{ backgroundColor: "white" }}>
          <Typography variant="h5" align="left" p="1rem">
            Tickets by Status
          </Typography>
          <div style={{ color: "white !important" }}>
            <PieChart
              style={{ height: "300px" }}
              label={({ dataEntry }) =>
                dataEntry.title + " " + dataEntry.value + "%"
              }
              labelStyle={(index) => ({
                fill: "black",
                fontSize: "7px",
                fontFamily: "sans-serif",
              })}
              labelPosition={60}
              data={[
                { title: "High", label: "test", value: 10, color: "#FF0000" },
                { title: "Med", value: 15, color: "#FFA500" },
                { title: "low", value: 20, color: "#FFFF00" },
              ]}
            />
          </div>
        </Grid>
      </Grid>
      {openModal === true ? (
        <AddProject setUpdate={setUpdate} setOpenModal={setOpenModal} />
      ) : null}
    </div>
  );
};

export default DashboardHome;
