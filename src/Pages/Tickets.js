import React, { useEffect, useState } from "react";
import {
  Button,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { setTickets } from "../Slices/ticketSlice";
import ReactTimeAgo from "react-time-ago";
import logo from "../images/bug-tracker.png";

const Tickets = () => {
  const dispatch = useDispatch();
  const { auth, tickets } = useSelector((state) => state);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userName = auth.name;

  useEffect(() => {
    fetch("https://awful-teddy-clam.cyclic.app/get/userTickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author: userName }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        dispatch(setTickets(data.results.reverse()));
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, []);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - tickets.allTickets.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handlePriority = (priority) => {
    if (priority === "high") {
      return (
        <div
          style={{
            color: "red",
            textTransform: "capitalize",
            fontWeight: "700",
          }}
        >
          {priority}❗
        </div>
      );
    } else if (priority === "medium") {
      return (
        <div
          style={{
            fontWeight: "900",
            color: "orange",
            textTransform: "capitalize",
          }}
        >
          {priority}
        </div>
      );
    } else if (priority === "low") {
      return (
        <div
          style={{
            fontWeight: "900",
            textTransform: "capitalize",
          }}
        >
          {priority}
        </div>
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "lightgray",
        position: "relative",
      }}
    >
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
      <div
        style={{
          margin: "0 auto",
          width: "80%",
          position: "absolute",
          top: "7.5rem",
          left: "0",
          right: "0",
          padding: "1rem 0rem",
        }}
      >
        <TableContainer component={Paper}>
          <div
            style={{
              padding: "1rem 3rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">My tickets</Typography>
          </div>
          <Table
            sx={{ minWidth: "100%", padding: "1rem 5rem" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow style={{ fontSize: "1.3rem" }}>
                <TableCell style={{ fontSize: "1.3rem", fontWeight: "900" }}>
                  Ticket
                </TableCell>
                <TableCell style={{ fontSize: "1.3rem", fontWeight: "900" }}>
                  Project
                </TableCell>
                <TableCell style={{ fontSize: "1.3rem", fontWeight: "900" }}>
                  Description
                </TableCell>
                <TableCell style={{ fontSize: "1.3rem" }} align="center">
                  Priority
                </TableCell>
                <TableCell style={{ fontSize: "1.3rem" }} align="right">
                  Date Opened
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? tickets.allTickets.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tickets.allTickets
              ).map((row, index) => (
                <TableRow
                  className="row-hover"
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ fontSize: "1.1rem" }}
                    component="th"
                    scope="row"
                  >
                    {row.title}
                  </TableCell>
                  <TableCell>{row.project_name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center">
                    {handlePriority(row.priority)}
                  </TableCell>
                  <TableCell align="right">
                    <ReactTimeAgo
                      date={row.start.replace(" ", ", ")}
                      locale="en-US"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={tickets.allTickets.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Tickets;
