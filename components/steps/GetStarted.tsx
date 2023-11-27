import * as React from "react";
import Image from "next/image";
import { Grid, Typography, Box, Button } from "@mui/material";
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
      {!web3Provider && (
        <Typography variant="subtitle1" align="center">
          Welcome, please connect with your wallet to start the survey. If you
          do not yet have MetaMask installed in your browser, press the DOWNLOAD
          METAMASK BUTTON, otherwise you will find the CONNECT WALLET connection
          button to start, thank you for your patience.
        </Typography>
      )}
      {web3Provider && (
        <>
          {network?.name === "goerli" && (
            <Typography variant="subtitle1" align="center">
              Well done! you are already connected to Goerli Network.
            </Typography>
          )}
          {network?.name !== "goerli" && (
            <Typography variant="subtitle1" align="center">
              Make sure you are connected to Goerli Network, if not, tap the
              metamask button to switch networks automatically.
            </Typography>
          )}
        </>
      )}
      <Box className={styles.container}>
        {web3Provider && (
          <>
            {network?.name === "goerli" ? (
              <Button variant="contained" onClick={() => handleStart(true)}>
                {"Begin Answering"}
              </Button>
            ) : (
              <Button variant="contained" disabled>
                {"Please switch to the Goerli Network to get started"}
              </Button>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
};

export default GetStarted;
