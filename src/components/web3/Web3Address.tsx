import React from "react";
import { Grid, Typography } from "@mui/material";
import { useWeb3Context } from "../../context";
import styles from "./styles/web3-info.module.css";

export function Web3Address() {
  const { address } = useWeb3Context();

  return (
    <Grid className={styles.container}>
      <Typography variant="overline">Your Address</Typography>
      <Typography variant="overline">{address}</Typography>
    </Grid>
  );
}
