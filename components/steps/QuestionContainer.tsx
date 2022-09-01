import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
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
  const [selected, setSelected] = useState<string>("");
  const [clean, setClean] = useState<boolean>(false);

  const questionReview = useMemo(() => {
    const initialData = [];
    for (let i = 0; i < questions.length; i++) {
      initialData.push({
        answerId: 0,
        question: questions[i].text,
        image: questions[i].image,
        option: "without selection",
      });
    }
    return initialData;
  }, [questions]);

  const handleInitialQuestion = () => {
    for (let i = 0; i < questions.length; i++) {
      questionReview.push({
        answerId: 0,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, questionReview.length]);

  useEffect(() => {
    if (selected) handleQuestion();
    if (clean) handleCleanSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Box className={styles.imageContainer}>
          <Image
            src={questions[index].image}
            width="250px"
            height="250px"
            priority
            className={styles.image}
            alt={questions[index].text}
          />
        </Box>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-question-label"
            name="row-radio-buttons-group"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            {questions[index].options.map((question, i) => (
              <FormControlLabel
                key={`${question.text}-${i}`}
                value={question.text}
                onClick={() => (questionReview[index].answerId = i + 1)}
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
