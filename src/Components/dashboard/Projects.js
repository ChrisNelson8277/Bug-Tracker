import { Box } from "@material-ui/core";
import { Button, Typography } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Project.css";

const Projects = (props) => {
  console.log(props);
  function createData(name, description, fat, carbs, protein) {
    return { name, description, fat, carbs, protein };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24),
    createData("Ice cream sandwich", 237, 9.0, 37),
    createData("Eclair", 262, 16.0, 24),
    createData("Cupcake", 305, 3.7, 67),
  ];
  function editProject(name) {
    props.setOpenModal(true);
  }

  return (
    <div
      style={{
        zIndex: "10",
        backgroundColor: "white",
        position: "absolute",
        top: "-3rem",
        width: "80%",
        left: "0",
        right: "0",
        margin: "0 auto",
        padding: "1rem 3rem",
      }}
    >
      <div
        style={{
          padding: "1rem 3rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Projects</Typography>
        <Button variant="contained">New Project</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Contributors</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell>
                  <MoreVertIcon
                    className="vert-icon"
                    onClick={() => {
                      editProject();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Projects;
