import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/logo.png";
import {
  Toolbar,
  Typography,
  AppBar,
  LinearProgress,
  Grid,
} from "@mui/material";
import styles from "./styles/header.module.css";

interface Props {
  lifetimeSeconds: number;
  index: number;
  step: string;
  handleTimer: (value: number) => void;
}

const Header: FunctionComponent<Props> = ({
  lifetimeSeconds,
  index,
  step,
  handleTimer,
}) => {
  const [timer, setTimer] = useState(0);
  const [update, setUpdate] = useState(false);

  const getTimeRemaining = (date: Date) => {
    const total =
      Date.parse(date.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    return { total, seconds };
  };

  const startTimer = (time: Date) => {
    let { total, seconds } = getTimeRemaining(time);
    if (total >= 0) setTimer(seconds);
  };

  const clearTimer = (time: Date) => {
    setInterval(() => {
      startTimer(time);
    }, 1000);
  };

  const getDeadTime = (lifetime: number) => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + lifetime + 1);
    return deadline;
  };

  const getPercentage = (lifetime: number) => {
    let time: number;
    if (lifetime >= 10) {
      time = lifetime / 10;
      return (timer * 10) / time;
    }
    if (lifetime < 10) {
      time = lifetime;
      return (timer * 100) / time;
    }
  };

  useEffect(() => {
    if (index !== undefined) setUpdate(true);
    setTimeout(() => {
      if (update) setUpdate(false);
    }, 1000);
  }, [index]);

  useEffect(() => {
    if (update) clearTimer(getDeadTime(lifetimeSeconds));
  }, [lifetimeSeconds, update]);

  useEffect(() => {
    handleTimer(timer);
  }, [timer]);

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Grid display="flex" flexDirection="row" alignItems="center">
              <div className={styles.logo}>
                <Image className={styles.image} src={Logo} alt="logo" />
              </div>
              <Typography
                className={styles.title}
                variant="h5"
                color="inherit"
                noWrap
              >
                WORK @ RATHER LABS
              </Typography>
            </Grid>
            {step === "start" && (
              <Typography variant="subtitle2" color="secondary" noWrap>
                WELLCOME!
              </Typography>
            )}
            {step === "finished" && (
              <Typography variant="subtitle2" color="secondary" noWrap>
                WELL DONE!
              </Typography>
            )}
            {step === "question" && (
              <Typography variant="subtitle2" color="secondary" noWrap>
                YOU HAVE {timer} SECONDS
              </Typography>
            )}
          </Grid>
        </Toolbar>
        <LinearProgress
          value={getPercentage(lifetimeSeconds)}
          className={styles.linearProgress}
          color={"secondary"}
          variant={"determinate"}
        />
      </AppBar>
    </>
  );
};

export default Header;
