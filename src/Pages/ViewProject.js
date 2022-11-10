import { Nightlife } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddProject from "../Components/Modals/AddProject";
import AddTicket from "../Components/Modals/AddTicket";
import TeamTable from "../Components/viewproject/TeamTable";
import TicketInformation from "../Components/viewproject/TicketInformation";
import TicketTable from "../Components/viewproject/TicketTable";
import "./viewproject.css";

const ViewProject = () => {
  const [loading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentProject, setCurrentProject] = useState();
  const [members, setMembers] = useState();
  const [tickets, setTickets] = useState([]);
  const [update, setUpdate] = useState();
  const [currentTicket, setCurrentTicket] = useState();
  console.log(tickets);
  let { id } = useParams();
  useEffect(() => {
    const information = {
      id: id,
    };
    fetch("http://localhost:5000/get/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          setCurrentProject(data.results);
          console.log(data.tickets);
          setMembers(data.members);
          console.log(data.tickets.length);
          let ticketData = [];
          data.tickets.map((arr) => {
            ticketData.push(JSON.parse(arr));
          });
          setTickets(ticketData);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, []);
  if (loading) {
    return <div>....Loading</div>;
  }
  const handleTickets = (ticket) => {
    console.log("handling ticket");
    let a;
    for (a = 0; a > tickets.length; a++) {
      console.log(ticket[a]);
    }
    setIsLoading(false);
  };
  return (
    <div style={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
      <Typography
        align="left"
        variant="h5"
        style={{
          color: "white",
          backgroundColor: "#1e81b0",
          padding: "1rem",
          height: "15rem",
          position: "relative",
        }}
      >
        Project
        <Typography style={{ margin: "5rem 0" }}>
          {currentProject[0].name}
        </Typography>
      </Typography>
      <div style={{ position: "relative" }}>
        <Grid
          container
          spacing={2}
          style={{
            zIndex: "10",
            position: "absolute",
            top: "-5rem",
            width: "100%",
            left: "0",
            right: "0",
            margin: "0 auto",
            padding: "1rem 3rem",
            justifyContent: "space-between",
          }}
        >
          <Grid xs={12} md={6} lg={4}>
            <div style={{ backgroundColor: "white" }}></div>
            <TeamTable members={members} currentProject={currentProject} />
          </Grid>
          <Grid xs={12} md={6} lg={7}>
            <div style={{ backgroundColor: "white" }}></div>
            <TicketTable
              loading={loading}
              setOpenModal={setOpenModal}
              tickets={tickets}
              members={members}
              setCurrentProject={setCurrentProject}
              currentProject={currentProject}
            />
          </Grid>
          <Grid xs={12}>
            <TicketInformation currentTicket={currentTicket} />
          </Grid>
        </Grid>
      </div>
      {openModal === true ? (
        <AddTicket
          setUpdate={setUpdate}
          currentProject={currentProject}
          setOpenModal={setOpenModal}
        />
      ) : null}
    </div>
  );
};

export default ViewProject;
