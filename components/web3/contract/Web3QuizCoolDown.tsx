import React, { useEffect, useCallback, useState } from "react";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { Grid, Typography } from "@mui/material";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import quizToken from "../../../contracts/Survey.json";
import styles from "./styles/web3-contract-card-info.module.css";

export function Web3QuizCoolDown() {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider } = useWeb3Context();
  const [coolDown, setCoolDown] = useState<string>("");

  const fetchCoolDown = useCallback(
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
          const response = await contract.cooldownSeconds();
          setCoolDown(String(response));
        } catch (error) {
          console.log("CoolDown error: ", error);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (web3Provider && quizAddress) {
      fetchCoolDown(web3Provider, quizAddress);
    } else {
      setCoolDown("");
    }
  }, [web3Provider, quizAddress, fetchCoolDown]);

  return (
    <Grid className={`${styles.container} ${styles.lightBlueBg}`}>
      <Typography variant="overline">Cooldown Time</Typography>
      <Typography variant="overline">{coolDown} Seconds</Typography>
    </Grid>
  );
}
