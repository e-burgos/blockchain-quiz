import React, { useEffect, useCallback, useState } from "react";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { Grid, Typography } from "@mui/material";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import quizToken from "../../../contracts/Survey.json";
import styles from "./styles/web3-contract-card-info.module.css";

export function Web3QuizName() {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider } = useWeb3Context();
  const [name, setName] = useState<string>("");

  const fetchName = useCallback(
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
          const response = await contract.name();
          setName(response);
        } catch (error) {
          console.log("name error: ", error);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (web3Provider && quizAddress) {
      fetchName(web3Provider, quizAddress);
    } else {
      setName("");
    }
  }, [web3Provider, quizAddress, name, fetchName]);

  return (
    <Grid className={`${styles.container} ${styles.lightBlueBg}`}>
      <Typography variant="overline">Token Name</Typography>
      <Typography variant="overline">{name}</Typography>
    </Grid>
  );
}
