import React, { useEffect, useCallback, useState } from "react";
import { useWeb3Context } from "../../context";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { Grid, Typography } from "@mui/material";
import styles from "./styles/web3-info.module.css";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../utils/consts";

export function Web3QuizBalance() {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider } = useWeb3Context();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (web3Provider && quizAddress) {
      fetchBalance(web3Provider, quizAddress);
    } else {
      setBalance("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Provider, quizAddress]);

  const fetchBalance = useCallback(
    async (web3Provider: ethers.providers.Web3Provider, address: string) => {
      const balance = await web3Provider.getBalance(address);
      setBalance(formatEther(balance));
    },
    []
  );

  return (
    <Grid className={`${styles.container} ${styles.lightBlueBg}`}>
      <Typography variant="overline">Quiz Balance</Typography>
      <Typography variant="overline">{balance}</Typography>
    </Grid>
  );
}
