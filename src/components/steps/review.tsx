import * as React from "react";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import styles from "./styles/review.module.css";
import { IQuetionReview } from "../../utils/types";
import { useWeb3Context } from "../../context";
import { Web3Button } from "../web3/Web3Button";

interface Props {
  image: string;
  questionReview: IQuetionReview[];
}

const Review: React.FunctionComponent<Props> = ({ image, questionReview }) => {
  const { web3Provider, network } = useWeb3Context();
  return (
    <Grid className={styles.container}>
      <Grid className={styles.header}>
        <img src={image} width={"30%"} alt="review" />
        <Typography variant="subtitle1" align="left">
          Thank you for participating in this quiz, for us it is very important
          to know your opinion. Next we will show you the results. To get the
          reward just press the button.
        </Typography>
      </Grid>
      {questionReview && (
        <List className={styles.list} sx={{ bgcolor: "background.paper" }}>
          {questionReview.map((question) => (
            <ListItem key={question.question}>
              <ListItemAvatar>
                <Avatar>
                  <img
                    src={question.image}
                    width={"100%"}
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
      {!web3Provider ? (
        <Web3Button />
      ) : (
        <>
          {network?.name === "ropsten" ? (
            <Button variant="contained">{"Get reward"}</Button>
          ) : (
            <Button variant="contained" disabled>
              {"Please switch to the Ropsten Network to get your reward"}
            </Button>
          )}
        </>
      )}
    </Grid>
  );
};

export default Review;
