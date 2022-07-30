import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { IQuetion, IQuetionReview } from "../../utils/types";
import styles from "./styles/question-container.module.css";

interface Props {
  questions: IQuetion[];
  index: number;
  handleQuestionReview: (value: IQuetionReview[]) => void;
}

const QuestionContainer: React.FunctionComponent<Props> = ({
  questions,
  index,
  handleQuestionReview,
}) => {
  const [questionReview, setQuestionReview] = useState<IQuetionReview[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [clean, setClean] = useState<boolean>(false);

  const handleInitialQuestion = () => {
    for (let i = 0; i < questions.length; i++) {
      questionReview.push({
        question: questions[i].text,
        image: questions[i].image,
        option: "without selection",
      });
    }
  };

  const handleQuestion = () => {
    if (selected !== "") questionReview[index].option = selected;
  };

  const handleCleanSelection = () => {
    setClean(false);
    setSelected("");
    questionReview[index].option = "without selection";
  };

  useEffect(() => {
    setClean(true);
    handleQuestionReview(questionReview);
    if (questionReview.length === 0) handleInitialQuestion();
    if (questionReview.length === index + 1) handleQuestion();
  }, [index, questionReview.length]);

  useEffect(() => {
    if (selected) handleQuestion();
    if (clean) handleCleanSelection();
  }, [selected, clean]);

  return (
    <Grid className={styles.container}>
      <Stepper activeStep={index} sx={{ pt: 3, pb: 5 }}>
        {questions.map((label) => (
          <Step key={label.text}>
            <StepLabel>{label.text}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid className={styles.questions}>
        <Typography variant="h5" gutterBottom>
          {questions[index].text}
        </Typography>
        <Box className={styles.image}>
          <img
            src={questions[index].image}
            width={"100%"}
            alt={questions[index].text}
            className={styles.image}
          />
        </Box>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-question-label"
            name="row-radio-buttons-group"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {questions[index].options.map((question, i) => (
              <FormControlLabel
                key={`${question.text}-${i}`}
                value={question.text}
                control={<Radio />}
                label={question.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default QuestionContainer;
