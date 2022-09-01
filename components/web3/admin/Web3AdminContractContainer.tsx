import React, { useEffect, useCallback, useState } from "react";
import { Button, Grid, Link, Typography } from "@mui/material";
import { useWeb3Context } from "../../../context";
import { ethers } from "ethers";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import quizToken from "../../../contracts/Survey.json";
import InfoContainer from "../../common/InfoContainer";
import styles from "./styles/web3-contract-container.module.css";
import { Web3SetCoolDown } from "./Web3SetCoolDown";
import CircularLoading from "../../common/CircularLoading";

const Web3AdminContractContainer: React.FunctionComponent = () => {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const { web3Provider, address } = useWeb3Context();
  const [adminAllowed, setAdminAllowed] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchOwner = useCallback(
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
          const response = await contract.owner();
          if (String(response) === userAddress) setAdminAllowed(true);
          setFetching(false);
        } catch (error) {
          console.log("symbol error: ", error);
          setAdminAllowed(false);
          setFetching(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (web3Provider && quizAddress && address) {
      setFetching(true);
      fetchOwner(web3Provider, quizAddress, address);
    } else {
      setAdminAllowed(false);
    }
  }, [web3Provider, quizAddress, fetchOwner, adminAllowed, address]);

  return (
    <>
      {fetching && <CircularLoading />}
      {adminAllowed && !fetching && (
        <Grid className={styles.container}>
          <Typography variant="overline">Change SetCoolDown</Typography>
          <Web3SetCoolDown />
        </Grid>
      )}
      {!adminAllowed && !fetching && (
        <Grid className={styles.infoContainer}>
          <InfoContainer
            message="You are not the owner of this contract. For more information touch the button."
            textVariant="h6"
            isError
          />
          <Link
            className={styles.link}
            color="inherit"
            target="_blank"
            href={`https://ropsten.etherscan.io/address/${quizAddress}`}
          >
            <Button color="inherit" variant="contained">
              {"View Contract"}
            </Button>
          </Link>
        </Grid>
      )}
    </>
  );
};

export default Web3AdminContractContainer;
