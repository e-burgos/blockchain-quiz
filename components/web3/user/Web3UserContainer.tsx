import * as React from "react";
import { Paper } from "@mui/material";
import { Web3Address } from "./Web3Address";
import { Web3Balance } from "./Web3Balance";
import { Web3Network } from "./Web3Network";
import { Web3QuizBalanceOf } from "./Web3QuizBalanceOf";
import styles from "./styles/web3-user-container.module.css";

const Web3Container: React.FunctionComponent = () => {
  return (
    <Paper className={styles.container} variant="outlined">
      <Web3Address />
      <Web3Network />
      <Web3Balance />
      <Web3QuizBalanceOf />
    </Paper>
  );
};

export default Web3Container;
