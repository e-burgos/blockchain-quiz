import React, { useEffect, useCallback, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import quizToken from "../../../contracts/Survey.json";
import styles from "./styles/web3-contract-card-info.module.css";

export function Web3QuizSymbol() {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider } = useWeb3Context();
  const [symbol, setSymbol] = useState<string>("");

  const fetchSymbol = useCallback(
    async (
      web3Provider: ethers.providers.Web3Provider,
      contractAddress: string
    ) => {
      if (web3Provider) {
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          quizToken.abi,
          signer
        );
        try {
          const response = await contract.symbol();
          setSymbol(response);
        } catch (error) {
          console.log("symbol error: ", error);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (web3Provider && quizAddress) {
      fetchSymbol(web3Provider, quizAddress);
    } else {
      setSymbol("");
    }
  }, [web3Provider, quizAddress, symbol, fetchSymbol]);

  return (
    <Grid className={`${styles.container} ${styles.lightBlueBg}`}>
      <Typography variant="overline">Token Symbol</Typography>
      <Typography variant="overline">{symbol}</Typography>
    </Grid>
  );
}
