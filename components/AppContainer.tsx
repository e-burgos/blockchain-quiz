import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuizData } from "../hooks/useQuizData";
import { IQuetion, IQuetionReview } from "../utils/types";
import { Paper, Container, Typography } from "@mui/material";
import Footer from "./common/Footer";
import Header from "./common/Header";
import CircularLoading from "./common/CircularLoading";
import InfoContainer from "./common/InfoContainer";
import QuestionContainer from "./steps/QuestionContainer";
import Review from "./steps/Review";
import Web3UserContainer from "./web3/user/Web3UserContainer";
import { useWeb3Context } from "../context";
import TabPanel from "./common/TabPanel";

const AppContainer: FunctionComponent = () => {
  const { web3Provider } = useWeb3Context();
  const { data, error } = useQuizData();
  const [activeQuestion, setActiveQuestion] = useState<number>(-1);
  const [step, setStep] = useState<string>("start");
  const [index, setIndex] = useState<number>(0);
  const [deadLine, setDeadLine] = useState<number>(0);
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState<boolean>(false);
  const [questionReview, setQuestionReview] = useState<IQuetionReview[]>([]);

  const questions = useMemo(() => {
    let questions: IQuetion[] = [];
    if (data) questions = data.questions;
    return questions;
  }, [data]);

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
      const autoNextStep = setTimeout(
        () => setIndex(getNextIndex),
        (questions[index].lifetimeSeconds + 2) * 1000
      );
      handleNext();
      return () => {
        clearTimeout(autoNextStep);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, questions.length, index, start, getNextIndex]);

  useEffect(() => {
    if (timer === 0 && index === questions.length - 1) setStep("finished");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <>
      {data && (
        <Header
          lifetimeSeconds={deadLine}
          index={index}
          step={step}
          onTimer={setTimer}
        />
      )}
      <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
        {web3Provider && step === "start" && <Web3UserContainer />}
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {data && (
            <>
              <Typography component="h1" variant="h4" align="center">
                {data.title}
              </Typography>
              <>
                {step === "start" && (
                  <TabPanel data={data} setStart={setStart} />
                )}
                {step === "finished" && (
                  <Review
                    surveyId={data.surveyId}
                    questionReview={questionReview}
                    image={data.image}
                  />
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
          {error && (
            <InfoContainer
              message="An unexpected error occurred, please try again later, thanks!"
              isError
            />
          )}
          {!error && !data && <CircularLoading />}
        </Paper>
        <Footer />
      </Container>
    </>
  );
};

export default AppContainer;
