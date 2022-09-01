import React, { useEffect, useCallback, useState } from "react";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { Grid, Typography } from "@mui/material";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import quizToken from "../../../contracts/Survey.json";
import styles from "./styles/web3-contract-card-info.module.css";

export function Web3QuizLastSubmittal() {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider, address } = useWeb3Context();
  const [submittal, setSubmittal] = useState<string>("");

  const fetchLastSubmittal = useCallback(
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
          const response = await contract.lastSubmittal(userAddress);
          const timestamp = Number(response);
          const date = new Date(timestamp);
          const hours = date.getHours();
          const minutes = "0" + date.getMinutes();
          const seconds = "0" + date.getSeconds();
          const formattedTime =
            hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
          setSubmittal(formattedTime);
        } catch (error) {
          console.log("last submittal error: ", error);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (web3Provider && quizAddress && address) {
      fetchLastSubmittal(web3Provider, quizAddress, address);
    } else {
      setSubmittal("");
    }
  }, [web3Provider, quizAddress, submittal, fetchLastSubmittal, address]);

  return (
    <Grid className={`${styles.container} ${styles.lightBlueBg}`}>
      <Typography variant="overline">Last Submittal</Typography>
      <Typography variant="overline">{submittal}</Typography>
    </Grid>
  );
}
