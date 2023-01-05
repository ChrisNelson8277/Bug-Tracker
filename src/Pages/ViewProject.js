import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddMemberModal from "../Components/Modals/AddMemberModal";
import AddTicket from "../Components/Modals/AddTicket";
import AddMember from "../Components/viewproject/AddMember";
import TeamTable from "../Components/viewproject/TeamTable";
import TicketInformation from "../Components/viewproject/TicketInformation";
import TicketTable from "../Components/viewproject/TicketTable";
import logo from "../images/bug-tracker.png";
import "./viewproject.css";

const ViewProject = () => {
  const [loading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [currentProject, setCurrentProject] = useState();
  const [members, setMembers] = useState();
  const [tickets, setTickets] = useState([]);
  const [update, setUpdate] = useState();
  const [currentTicket, setCurrentTicket] = useState();
  const [comments, setComments] = useState();
  let { id } = useParams();
  console.log(update);
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
          setMembers(data.members);
          //   let ticketData = [];
          //   data.tickets.map((arr) => {
          //     ticketData.push(JSON.parse(arr));
          //     return arr;
          //   });
          //   setTickets(ticketData);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, [update]);
  if (loading) {
    return <div>....Loading</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        minHeight: "125vh",
      }}
    >
      <div
        align="left"
        variant="h5"
        style={{
          backgroundColor: "#1976d2",
          padding: "1rem",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
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
        <Typography style={{ fontSize: "1.3rem", margin: "5rem 0" }}>
          <span
            style={{ fontSize: "1.5rem", color: "white", fontWeight: "500" }}
          >
            Project:
          </span>{" "}
          <span style={{ textTransform: "capitalize" }}>
            {currentProject[0].name}
          </span>
        </Typography>
      </div>
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
          <Grid item xs={12} md={6} lg={4}>
            <div style={{ backgroundColor: "white" }}></div>
            <TeamTable
              setOpenMemberModal={setOpenMemberModal}
              members={members}
              currentProject={currentProject}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <div style={{ backgroundColor: "white" }}></div>
            <TicketTable
              setComments={setComments}
              loading={loading}
              setOpenModal={setOpenModal}
              tickets={tickets}
              members={members}
              update={update}
              setTickets={setTickets}
              setCurrentTicket={setCurrentTicket}
              currentProject={currentProject}
            />
          </Grid>
          <Grid item xs={12}>
            <TicketInformation
              members={members}
              update={update}
              setUpdate={setUpdate}
              comments={comments}
              setComments={setComments}
              currentTicket={currentTicket}
            />
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
      {openMemberModal === true ? (
        <AddMemberModal
          setUpdate={setUpdate}
          currentProject={currentProject}
          setOpenMemberModal={setOpenMemberModal}
        />
      ) : null}
    </div>
  );
};

export default ViewProject;
