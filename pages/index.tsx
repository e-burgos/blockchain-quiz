import React, { useCallback, useEffect, useState } from "react";
import { useData } from "../src/hooks/getData";
import { NextPage } from "next";
import { IQuetion, IQuetionReview } from "../src/utils/types";
import { Paper, Container, Typography } from "@mui/material";
import Copyright from "../src/components/common/copyright";
import Header from "../src/components/common/header";
import CircularLoading from "../src/components/common/circular-loading";
import ErrorContainer from "../src/components/common/error-container";
import GetStarted from "../src/components/steps/get-started";
import QuestionContainer from "../src/components/steps/question-container";
import Review from "../src/components/steps/review";

const Index: NextPage = () => {
  const { data, error } = useData();
  const [activeQuestion, setActiveQuestion] = useState<number>(-1);
  const [step, setStep] = useState<string>("start");
  const [index, setIndex] = useState<number>(0);
  const [deadLine, setDeadLine] = useState<number>(0);
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState<boolean>(false);
  const [questionReview, setQuestionReview] = useState<IQuetionReview[]>([]);

  let questions: IQuetion[] = [];
  if (data) questions = data.questions;

  const handleNext = () => {
    if (index >= 0 && index < questions.length) {
      setDeadLine(questions[index].lifetimeSeconds);
    }
    setStep("question");
    setActiveQuestion(activeQuestion + 1);
  };

  const getNextIndex = useCallback(
    (currentIndex: number) => {
      return currentIndex === questions.length - 1
        ? questions.length - 1
        : currentIndex + 1;
    },
    [questions]
  );

  useEffect(() => {
    if (questions.length !== 0 && !questions[index]) setIndex(0);
    if (questions.length !== 0 && start) {
      const autoNextAlert = setTimeout(
        () => setIndex(getNextIndex),
        (questions[index].lifetimeSeconds + 2) * 1000
      );
      handleNext();
      return () => {
        clearTimeout(autoNextAlert);
      };
    }
  }, [questions, questions.length, index, start, getNextIndex]);

  useEffect(() => {
    if (timer === 0 && index === questions.length - 1) setStep("finished");
  }, [timer]);

  return (
    <>
      {data && (
        <Header
          lifetimeSeconds={deadLine}
          index={index}
          step={step}
          handleTimer={setTimer}
        />
      )}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {data && (
            <>
              <Typography component="h1" variant="h4" align="center">
                {data.title}
              </Typography>
              <>
                {step === "start" && (
                  <GetStarted image={data.image} handleStart={setStart} />
                )}
                {step === "finished" && (
                  <Review questionReview={questionReview} image={data.image} />
                )}
                {step === "question" && (
                  <QuestionContainer
                    handleQuestionReview={setQuestionReview}
                    index={index}
                    questions={data.questions}
                  />
                )}
              </>
            </>
          )}
          {error && <ErrorContainer />}
          {!error && !data && <CircularLoading />}
        </Paper>
        <Copyright />
      </Container>
    </>
  );
};

export default Index;
