import { Grid, Typography } from "@mui/material";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../../utils/consts";
import styles from "./styles/web3-contract-card-info.module.css";

export function Web3QuizContractAdress() {
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;

  return (
    <Grid className={`${styles.container} ${styles.lightBlueBg}`}>
      <Typography variant="overline">Contract Address</Typography>
      <Typography variant="overline">{quizAddress}</Typography>
    </Grid>
  );
}
