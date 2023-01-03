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
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useSelector } from "react-redux";

const ManageUsers = () => {
  const { auth } = useSelector((state) => state);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
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
        setUsers(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, []);
  console.log(users);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 2) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "lightgray",
        position: "relative",
      }}
    >
      <Typography
        align="left"
        variant="h5"
        style={{
          backgroundColor: "#1e81b0",
          padding: "1rem",
          height: "10rem",
          width: "100%",
        }}
      >
        BugTracker
      </Typography>
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
            <Typography variant="h5">Manage Users</Typography>
          </div>
          <Table
            sx={{ minWidth: "100%", padding: "1rem 5rem" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow style={{ fontSize: "1.3rem" }}>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.3rem", fontWeight: "900" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.3rem", fontWeight: "900" }}
                >
                  Role
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.3rem", fontWeight: "900" }}
                >
                  E-Mail
                </TableCell>
                <TableCell />
                {/* <TableCell style={{ fontSize: "1.3rem" }} align="center">
                  Priority
                </TableCell>
                <TableCell style={{ fontSize: "1.3rem" }} align="right">
                  Date Opened
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              ).map((row, index) => (
                <TableRow
                  className="row"
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ fontSize: "1.1rem", textTransform: "capitalize" }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.role}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="left">
                    <Button
                      //   style={{ backgroundColor: "red" }}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={users.length}
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

export default ManageUsers;
