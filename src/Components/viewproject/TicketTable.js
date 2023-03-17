import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import {
  Button,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router";

const TicketTable = (props, { update }) => {
  const [currentRow, setCurrentRow] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { id } = useParams();
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.tickets.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
  }, [props.update]);
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
          fontFamily: "'Oswald', sans-serif",
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
            (rowsPerPage > 0
              ? props.tickets.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.tickets
            ).map((row, index) => (
              <TableRow
                className={currentRow === index ? "selected" : "ticket-row"}
                onClick={() => {
                  handleSelect(index, row);
                }}
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                  component="th"
                  scope="row"
                >
                  {row.title}
                </TableCell>
                <TableCell
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                  align="left"
                >
                  {row.description}
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                  align="left"
                >
                  {row.author}
                </TableCell>
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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={props.tickets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TicketTable;
