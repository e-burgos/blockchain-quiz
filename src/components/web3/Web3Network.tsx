import React from "react";
import { useWeb3Context } from "../../context";
import { Grid, Typography } from "@mui/material";
import styles from "./styles/web3-info.module.css";

export function Web3Network() {
  const { network } = useWeb3Context();

  return (
    <Grid className={styles.container}>
      <Typography variant="overline">Current Network</Typography>
      <Typography variant="overline"> {network?.name}</Typography>
    </Grid>
  );
}
