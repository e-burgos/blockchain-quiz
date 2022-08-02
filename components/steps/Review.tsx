import React, { useState } from "react";
import Image from "next/image";
import { useWeb3Context } from "../../context";
import { ethers } from "ethers";
import { NEXT_PUBLIC_CONTRACT_ADDRESS } from "../../utils/consts";
import quizTokenAbi from "../../contracts/abi.json";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Link,
} from "@mui/material";
import styles from "./styles/review.module.css";
import { IQuetionReview } from "../../utils/types";
import { Web3Button } from "../web3/Web3Button";
import InfoContainer from "../common/InfoContainer";
import { useRouter } from "next/router";

interface Props {
  image: string;
  surveyId: number;
  questionReview: IQuetionReview[];
}

const Review: React.FunctionComponent<Props> = ({
  image,
  questionReview,
  surveyId,
}) => {
  const router = useRouter();
  const { web3Provider, network } = useWeb3Context();
  const quizAddress = `${NEXT_PUBLIC_CONTRACT_ADDRESS}`;
  const [hash, setHash] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleResults = () => {
    const results: number[] = [];
    for (let i = 0; i < questionReview.length; i++) {
      results.push(questionReview[i].answerId);
    }
    return results;
  };

  async function handleQuizBalance() {
    if (web3Provider) {
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(quizAddress, quizTokenAbi, signer);
      try {
        const response = await contract.submit(surveyId, handleResults());
        setHash(response?.hash);
      } catch (error) {
        console.log("Submit error: ", error);
        setError(true);
      }
    }
  }

  return (
    <Grid className={styles.container}>
      <Grid className={styles.header}>
        <Image src={image} width="400px" height="400px" alt="review" />
        <Typography variant="subtitle1" align="left">
          Thank you for participating in this quiz, for us it is very important
          to know your opinion. Next we will show you the results. To get the
          reward just press the button.
        </Typography>
      </Grid>
      {!error && !hash && questionReview && (
        <List className={styles.list} sx={{ bgcolor: "background.paper" }}>
          {questionReview.map((question) => (
            <ListItem key={question.question}>
              <ListItemAvatar>
                <Avatar>
                  <Image
                    src={question.image}
                    width="100px"
                    height="100px"
                    alt={question.question}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={question.question}
                secondary={question.option}
              />
            </ListItem>
          ))}
        </List>
      )}
      {error && (
        <InfoContainer
          message={`An unexpected error occurred, please try again later, thanks!`}
          isError
        />
      )}
      {hash && (
        <>
          <InfoContainer
            message={`Your transaction was successful. Press the button to consult it.`}
            isSuccess
          />

          <Typography className={styles.hashContainer} variant="caption">
            {hash}
          </Typography>
        </>
      )}
      {!web3Provider ? (
        <Web3Button />
      ) : (
        <>
          {network?.name === "ropsten" ? (
            <>
              {hash ? (
                <Grid>
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
                  <Button variant="contained" onClick={() => router.reload()}>
                    {"Back"}
                  </Button>
                </Grid>
              ) : error ? (
                <Button variant="contained" onClick={() => router.reload()}>
                  {"Try again!"}
                </Button>
              ) : (
                <Button variant="contained" onClick={() => handleQuizBalance()}>
                  {"Get reward"}
                </Button>
              )}
            </>
          ) : (
            <Button variant="contained" disabled>
              {!error
                ? "An unexpected error occurred, please try again later, thanks!"
                : "Please switch to the Ropsten Network to get your reward"}
            </Button>
          )}
        </>
      )}
    </Grid>
  );
};

export default Review;
