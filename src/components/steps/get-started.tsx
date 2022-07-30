import * as React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import styles from "./styles/get-started.module.css";
import { Web3Button } from "../web3/web3-button";
import { useWeb3Context } from "../../context";

interface Props {
  handleStart: (value: boolean) => void;
  image: string;
}

const GetStarted: React.FunctionComponent<Props> = ({ image, handleStart }) => {
  const { web3Provider, network } = useWeb3Context();
  return (
    <Grid className={styles.container}>
      <img src={image} width={"80%"} alt="error" />
      <Typography variant="subtitle1" align="center">
        Make sure you are connected to ropsten, if not, tap the metamask button
        to switch networks automatically.
      </Typography>
      <Box className={styles.container}>
        {!web3Provider ? (
          <Web3Button />
        ) : (
          <>
            {network?.name === "ropsten" ? (
              <Button variant="contained" onClick={() => handleStart(true)}>
                {"Begin Answering"}
              </Button>
            ) : (
              <Button variant="contained" disabled>
                {"Please switch to the Ropsten Network to get started"}
              </Button>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
};

export default GetStarted;
