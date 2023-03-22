import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import "./ticket.css";
import EditTicket from "../Modals/EditTicket";

const TicketInformation = (props) => {
  const [commentData, setCommentData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { auth } = useSelector((state) => state);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [props.comments]);
  const handleAddComment = () => {
    let newComment = {
      id: props.currentTicket.ticket_id,
      commentId: uuidv4(),
      author: auth.name,
      time: moment().format("h:mm:ss a"),
      date: moment().format("MMMM Do YYYY"),
      comment: commentData,
    };
    fetch("https://awful-teddy-clam.cyclic.app/add/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.currentTicket.ticket_id,
        commentId: uuidv4(),
        author: auth.name,
        date: "fullDate",
        comment: commentData,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        if (data.code === 200) {
          props.setComments([...props.comments, newComment]);
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  };
  if (!props.currentTicket) {
    return (
      <>
        <div
          style={{
            backgroundColor: "white",
            marginTop: "3rem",
            borderRadius: "10px",
          }}
        >
          <Typography
            p="1rem"
            align="left"
            style={{ borderBottom: "2px solid lightgray", fontWeight: "800" }}
          >
            Selected Ticket Info
          </Typography>
        </div>
        <h4
          style={{
            backgroundColor: "white",
            margin: "0",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          No Selected Ticket
        </h4>
      </>
    );
  }
  const assignedDevs = JSON.parse(props.currentTicket.assignedmembers);
  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop: "3rem",
        borderRadius: "10px",
      }}
    >
      <Typography
        p="1rem"
        align="left"
        style={{
          borderBottom: "2px solid lightgray",
          fontWeight: "800",
        }}
      >
        Selected Ticket Info
      </Typography>
      <div></div>
      {props.currentTicket.title ? (
        <Grid
          container
          style={{
            width: "97%",
            margin: "auto",
            justifyContent: "space-between",
          }}
        >
          <Grid
            xs={12}
            p="1rem"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Button
              variant="contained"
              style={{ textAlign: "right" }}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Edit
            </Button>
          </Grid>
          <Grid
            xs={6.5}
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              margin: "1rem 0",
              borderRadius: "10px",
            }}
          >
            <Grid container style={{ borderBottom: "1px solid lightgray" }}>
              <Grid xs={3} p="0.3rem">
                <div>
                  <Typography
                    align="left"
                    variant="h5"
                    p="0.3rem 1rem"
                    style={{ fontSize: "0.8rem", color: "gray" }}
                  >
                    Ticket Title
                  </Typography>
                  <Typography
                    align="left"
                    variant="h4"
                    p="0.5rem 1rem"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "800",
                    }}
                  >
                    {props.currentTicket.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    align="left"
                    p="1rem"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Status
                  </Typography>
                </div>
                <div style={{ display: "flex", padding: "0 1rem" }}>
                  <button
                    style={{
                      backgroundColor: "rgb(25, 118, 210)",
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                      width: "auto",
                      color: "white",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    {props.currentTicket.status}
                  </button>
                </div>
              </Grid>
              <Grid xs={3}>
                {" "}
                <Typography
                  align="left"
                  variant="h5"
                  p="0.3rem 1rem"
                  style={{ fontSize: "0.8rem", color: "gray" }}
                >
                  Author
                </Typography>
                <Typography
                  variant="h4"
                  align="left"
                  p="0.5rem 1rem"
                  style={{
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}
                >
                  {props.currentTicket.author}
                </Typography>
                <Typography
                  variant="h5"
                  align="left"
                  p="1rem"
                  style={{ fontSize: "0.8rem" }}
                >
                  Priority
                </Typography>
                <div style={{ display: "flex", padding: "0 1rem" }}>
                  <button
                    style={{
                      backgroundColor: "rgb(25, 118, 210)",
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                      width: "auto",
                      color: "white",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    {props.currentTicket.priority}
                  </button>
                </div>
              </Grid>
              <Grid xs={6}>
                {" "}
                <Typography
                  align="left"
                  variant="h5"
                  p="0.3rem 1rem"
                  style={{ fontSize: "0.8rem", color: "gray" }}
                >
                  Ticket Description
                </Typography>
                <Typography
                  variant="h4"
                  align="left"
                  p="0.5rem 1rem"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "800",
                  }}
                >
                  {props.currentTicket.description}
                </Typography>
                <Typography
                  variant="h5"
                  align="left"
                  p="1rem"
                  style={{ fontSize: "0.8rem" }}
                >
                  Type
                </Typography>
                <div style={{ display: "flex", padding: "0 1rem" }}>
                  <button
                    style={{
                      backgroundColor: "rgb(25, 118, 210)",
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                      width: "auto",
                      color: "white",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    {props.currentTicket.type}
                  </button>
                </div>
              </Grid>
            </Grid>
            <Grid xs={12} p="0.3rem 1rem">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                  p="1rem 0.5rem"
                  align="left"
                  style={{ fontSize: "0.8rem", color: "gray" }}
                >
                  Assigned Developers
                </Typography>
              </div>
              <div>
                <div
                  style={{
                    textAlign: "left",
                    padding: "1rem 0.5rem",
                    fontWeight: "800",
                    textTransform: "capitalize",
                  }}
                >
                  {assignedDevs
                    ? assignedDevs.map((row, index) => {
                        return assignedDevs.length != index + 1 ? (
                          <>{row.name + ", "}</>
                        ) : (
                          <>{row.name}</>
                        );
                      })
                    : null}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid
            xs={5.2}
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              margin: "1rem 0",
              borderRadius: "10px",
            }}
          >
            <Typography
              align="left"
              p="1rem"
              style={{
                borderBottom: "1px solid gray",
                fontSize: "1rem",
                fontWeight: "800",
              }}
            >
              Comments
            </Typography>
            <div className="comment-container" id="comment-container">
              {props.comments
                ? props.comments.map((row) => (
                    <div
                      key={row.commentId}
                      style={{
                        textAlign: "left",
                        padding: "0.3rem 1rem",
                        fontSize: "0.7rem",
                      }}
                    >
                      <span style={{ textTransform: "capitalize" }}>
                        {row.author}- {row.date}- {row.time}
                      </span>
                      <div style={{ padding: "0", fontSize: "0.9rem" }}>
                        {row.comment}
                      </div>
                    </div>
                  ))
                : null}
              <div ref={messagesEndRef}></div>
            </div>
            <Grid
              container
              style={{
                width: "95%",
                justifyContent: "space-between",
                margin: "auto",
              }}
            >
              <Grid xs={9}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Add Comment"
                  variant="outlined"
                  onChange={(e) => {
                    setCommentData(e.target.value);
                  }}
                  style={{
                    border: "1px solid black",
                    margin: "3rem 0",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
              <Grid xs={3} p="1rem" style={{ margin: "3rem 0" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    handleAddComment();
                  }}
                >
                  Comment
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {openModal === true ? (
        <EditTicket
          members={props.members}
          currentTicket={props.currentTicket}
          setOpenModal={setOpenModal}
          setUpdate={props.setUpdate}
        ></EditTicket>
      ) : null}
    </div>
  );
};

export default TicketInformation;
