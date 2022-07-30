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

interface Props {
  image: string;
  questionReview: IQuetionReview[];
}

const Review: React.FunctionComponent<Props> = ({ image, questionReview }) => {
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
      <Button variant="contained" sx={{ mt: 3, ml: 1 }}>
        {"Get reward"}
      </Button>
    </Grid>
  );
};

export default Review;
