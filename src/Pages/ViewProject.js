import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const ViewProject = () => {
  const [loading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState();
  let { id } = useParams();
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
          setIsLoading(false);
          console.log(currentProject);
        }
      })
      .catch((e) => {
        console.error(e.error);
      });
  }, []);
  if (loading) {
    return <div>....Loading</div>;
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <>
            {currentProject[0].id} {JSON.parse(currentProject[0].assignedto)}
          </>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewProject;
