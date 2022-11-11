import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const TicketInformation = (props) => {
  const [comments, setComments] = useState({
    name: "Christopher Nelson",
    comment: "My First Comment",
    timeStamp: new Date(),
  });
  const [commentData, setCommentData] = useState();
  const handleAddComment = () => {
    let date = new Date();
    var year = date.getFullYear().toString();
    var month = date.getMonth() + 1;
    var day = date.getDate().toString();
    var currentTime = date.getHours();
    var fullDate = month.toString() + "-" + day + "-" + year;
    console.log(fullDate, currentTime);
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
            xs={6.5}
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              margin: "1rem 0",
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid xs={3} p="0.3rem">
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
                    color: "#9370DB",
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
                <div style={{ display: "flex", padding: "0 1rem" }}>
                  <button
                    style={{
                      backgroundColor: "#9370DB",
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
                      backgroundColor: "#9370DB",
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
                      backgroundColor: "#9370DB",
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
            <div>
              {comments ? (
                <div
                  style={{
                    textAlign: "left",
                    padding: "1rem",
                    fontSize: "0.7rem",
                  }}
                >
                  <span>{comments.name}- 11/10/2022 6:34P.M:</span>
                  <div style={{ padding: "0", fontSize: "0.9rem" }}>
                    {comments.comment}
                  </div>
                </div>
              ) : null}
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
    </div>
  );
};

export default TicketInformation;
