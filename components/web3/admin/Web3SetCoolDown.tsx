import React, { useCallback, useState } from "react";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import quizToken from "../../../contracts/Survey.json";
import { useRouter } from "next/router";
import styles from "./styles/web3-contract-card-info.module.css";

export function Web3SetCoolDown() {
  const router = useRouter();
  const contractAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider } = useWeb3Context();
  const [coolDown, setCoolDown] = useState<number>(0);
  const [hash, setHash] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const fetchSetCoolDown = useCallback(async () => {
    if (web3Provider && coolDown > 0) {
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        quizToken.abi,
        signer
      );
      try {
        const response = await contract.setCooldown(coolDown);
        console.log(response);
        setHash(response?.hash);
        setCoolDown(0);
      } catch (error) {
        console.log("CoolDown error: ", error);
        setError(true);
      }
    }
  }, [contractAddress, coolDown, web3Provider]);

  return (
    <>
      {hash && (
        <Grid className={`${styles.container}`}>
          <Typography variant="overline">Successful operation!</Typography>
          <Link
            className={styles.link}
            color="inherit"
            target="_blank"
            href={`https://ropsten.etherscan.io/tx/${hash}`}
          >
            <Button color="inherit" variant="contained">
              {"View Transaction"}
            </Button>
          </Link>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              setHash("");
              router.reload();
            }}
          >
            {"OK"}
          </Button>
        </Grid>
      )}
      {error && (
        <Grid className={`${styles.container}`}>
          <Typography variant="overline">Failed operation!</Typography>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setError(false);
              router.reload();
            }}
          >
            {"Try again"}
          </Button>
        </Grid>
      )}
      {!hash && !error && (
        <Grid className={`${styles.container}`}>
          <TextField
            id="cool-down"
            label="SET COOLDOWN"
            type="number"
            onChange={(e) => setCoolDown(Number(e.target.value))}
            variant="outlined"
          />
          <Button
            color="primary"
            variant="contained"
            disabled={coolDown <= 0}
            onClick={fetchSetCoolDown}
          >
            {"Update Cooldown"}
          </Button>
        </Grid>
      )}
    </>
  );
}
