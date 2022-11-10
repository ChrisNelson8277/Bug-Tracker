import { Box } from "@material-ui/core";
import {
  Button,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Project.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "../../Slices/projectSlice";
import { useNavigate } from "react-router";

const Projects = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { projects } = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  function editProject(name) {
    props.setOpenModal(true);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - projects.list.projects.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function viewProject(name, description, id, assignedto) {
    const project = {
      name: name,
      description: description,
      id: id,
      assignedto: assignedto,
    };
    dispatch(setCurrentProject(project));
    setTimeout(() => {
      navigate(`/project/view/${project.id}`);
    }, 100);
  }
  const handleJson = (data) => {
    let members = [];
    let a;
    for (a = 0; a < data.length; a++) {
      if (a === data.length) {
        members.push(data[a].name);
        return;
      } else if (a <= data.length) {
        members.push(data[a].name + ", ");
      }
    }
    return members;
  };

  return (
    <div
      style={{
        zIndex: "10",
        position: "absolute",
        top: "-3rem",
        width: "80%",
        left: "0",
        right: "0",
        margin: "0 auto",
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
          <Typography variant="h5">Projects</Typography>
          <Button
            variant="contained"
            onClick={() => {
              editProject();
            }}
          >
            New Project
          </Button>
        </div>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Contributors</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? projects.list.projects.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : projects.list.projects
            ).map((row, index) => (
              <TableRow
                className="row-hover"
                key={index}
                onClick={() => {
                  viewProject(
                    row.name,
                    row.description,
                    row.id,
                    row.assignedto
                  );
                }}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ fontWeight: "900", fontSize: "1.1rem" }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">
                  {handleJson(JSON.parse(row.assignedto))}
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell>
                  <MoreVertIcon className="vert-icon" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={projects.list.projects.length}
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
  );
};

export default Projects;
