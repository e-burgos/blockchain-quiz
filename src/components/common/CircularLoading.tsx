import React, { FunctionComponent } from "react";
import { CircularProgress, Grid } from "@mui/material";

const CircularLoading: FunctionComponent = () => {
  return (
    <Grid
      height="400px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={100} color={"secondary"} />
    </Grid>
  );
};

export default CircularLoading;
