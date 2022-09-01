import React, { useEffect, useCallback, useState } from "react";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { Grid, Typography } from "@mui/material";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import quizToken from "../../../contracts/Survey.json";
import styles from "./styles/web3-info.module.css";

export function Web3QuizBalanceOf() {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider, address } = useWeb3Context();
  const [balance, setBalance] = useState<string>("");

  const fetchSupply = useCallback(
    async (
      web3Provider: ethers.providers.Web3Provider,
      contractAddress: string,
      userAddress: string
    ) => {
      if (web3Provider) {
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          quizToken.abi,
          signer
        );
        try {
          const response = await contract.balanceOf(userAddress);
          setBalance(String(response));
        } catch (error) {
          console.log("Supply error: ", error);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (web3Provider && quizAddress && address) {
      fetchSupply(web3Provider, quizAddress, address);
    } else {
      setBalance("");
    }
  }, [web3Provider, quizAddress, fetchSupply, address]);

  return (
    <Grid className={`${styles.container} ${styles.lightBlueBg}`}>
      <Typography variant="overline">Your QUIZ Tokens</Typography>
      <Typography variant="overline">{balance} QUIZ</Typography>
    </Grid>
  );
}
