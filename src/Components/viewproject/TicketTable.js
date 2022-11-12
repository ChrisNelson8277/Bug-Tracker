import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router";

const TicketTable = (props, { update }) => {
  const [currentRow, setCurrentRow] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:5000/get/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        if (data.code === 200) {
          console.log(data.results);
          props.setTickets(data.results);
          setLoading(false);
          //   let ticketData = [];
          //   data.tickets.map((arr) => {
          //     ticketData.push(JSON.parse(arr));
          //     return arr;
          //   });
          //   setTickets(ticketData);
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  const handleSelect = (index, row) => {
    let ticketData = [];
    let ticketInfo = JSON.parse(row.comments);
    ticketInfo.map((arr) => {
      ticketData.push(JSON.parse(arr));
      return arr;
    });
    props.setComments(ticketData.reverse());
    setCurrentRow(index);
    props.setCurrentTicket(row);
  };
  return (
    <TableContainer component={Paper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 3rem",
          borderBottom: "1px solid gray",
        }}
      >
        <Typography variant="h5">Tickets</Typography>
        <Button
          onClick={() => {
            props.setOpenModal(true);
          }}
          variant="contained"
        >
          Add Ticket
        </Button>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TICKET TITLE</TableCell>
            <TableCell align="left">DESCRIPTION</TableCell>
            <TableCell align="left">TICKET AUTHOR</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {props.tickets.length > 0 ? ( */}
          {
            props.tickets.map((row, index) => (
              <TableRow
                className={currentRow === index ? "selected" : "ticket-row"}
                onClick={() => {
                  handleSelect(index, row);
                }}
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.author}</TableCell>
                <TableCell align="left">
                  <MoreVertIcon />
                </TableCell>
              </TableRow>
            ))
            /* ) : (
            <TableRow align="center">
              <TableCell align="left">No current tickets</TableCell>
            </TableRow>
          )} */
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable;
