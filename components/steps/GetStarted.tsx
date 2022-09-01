import * as React from "react";
import Image from "next/image";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Web3Button } from "../web3/user/Web3Button";
import { useWeb3Context } from "../../context";
import styles from "./styles/get-started.module.css";

interface Props {
  handleStart: (value: boolean) => void;
  image: string;
}

const GetStarted: React.FunctionComponent<Props> = ({ image, handleStart }) => {
  const { web3Provider, network } = useWeb3Context();
  return (
    <Grid className={styles.container}>
      <Image
        src={image}
        priority
        width="300px"
        height="300px"
        alt="get started"
      />
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
