import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";

const TeamTable = (props) => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const handleJson = () => {
    const memberInfo = JSON.parse(props.currentProject[0].assignedto);
  };
  handleJson();
  return (
    <TableContainer component={Paper} style={{ minHeight: "100%" }}>
      <div
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "space-between",
          padding: "1rem 3rem",
          borderBottom: "1px solid gray",
        }}
      >
        <Typography variant="h5">Members</Typography>
        <Button
          onClick={() => {
            props.setOpenMemberModal(true);
          }}
          variant="contained"
        >
          Add Member
        </Button>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.members.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                style={{
                  fontWeight: "800",
                  fontSize: "1.01rem",
                  textTransform: "capitalize",
                }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
