import * as React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import styles from "./styles/get-started.module.css";

interface Props {
  handleStart: (value: boolean) => void;
  image: string;
}

const GetStarted: React.FunctionComponent<Props> = ({ image, handleStart }) => {
  return (
    <Grid className={styles.container}>
      <img src={image} width={"80%"} alt="error" />

      <Typography variant="subtitle1" align="center">
        Make sure you are connected to ropsten, if not, tap the metamask button
        to switch networks automatically.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 3, ml: 1 }}>Connect to Metamask</Button>
        <Button
          variant="contained"
          onClick={() => handleStart(true)}
          sx={{ mt: 3, ml: 1 }}
        >
          {"Begin Answering"}
        </Button>
      </Box>
    </Grid>
  );
};

export default GetStarted;
