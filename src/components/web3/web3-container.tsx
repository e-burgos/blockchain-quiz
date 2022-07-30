import * as React from "react";
import { Paper } from "@mui/material";
import styles from "./styles/web3-container.module.css";
import { Web3Address } from "./web3-address";
import { Web3Balance } from "./web3-balance";
import { Web3Network } from "./web3-network";

const Web3Container: React.FunctionComponent = () => {
  return (
    <Paper className={styles.container} variant="outlined">
      <Web3Address />
      <Web3Network />
      <Web3Balance />
    </Paper>
  );
};

export default Web3Container;
