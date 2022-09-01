import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import {
  Toolbar,
  Typography,
  AppBar,
  LinearProgress,
  Grid,
  Box,
} from "@mui/material";
import { Web3Button } from "../web3/user/Web3Button";
import styles from "./styles/header.module.css";

interface Props {
  lifetimeSeconds: number;
  index: number;
  step: string;
  onTimer: (value: number) => void;
}

const Header: FunctionComponent<Props> = ({
  lifetimeSeconds,
  index,
  step,
  onTimer,
}) => {
  const [timer, setTimer] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    onTimer(timer);
  }, [onTimer, timer]);

  const countdown = () => {
    let timer = lifetimeSeconds;
    const interval: NodeJS.Timer = setInterval(() => {
      setTimer(timer);
      timer = timer - 1;
      if (timer < 0) clearInterval(interval);
    }, 1000);
  };

  const getPercentage = (lifetime: number) => {
    let time: number;
    if (timer >= lifetime) return 100;
    if (lifetime >= 10) {
      time = lifetime / 10;
      return (timer * 10) / time;
    }
    if (lifetime < 10) {
      return (timer / lifetime) * 100;
    }
  };

  useEffect(() => {
    if (index !== currentIndex) setCurrentIndex(index);
    if (index === currentIndex) {
      setTimer(0);
      countdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, index, lifetimeSeconds]);

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
              <Box className={styles.logo}>
                <Image
                  className={styles.image}
                  priority
                  src={Logo}
                  alt="logo"
                />
              </Box>
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
              <Web3Button
                colorConnect="secondary"
                colorDisconnect="secondary"
              />
            )}
            {step === "finished" && (
              <Web3Button
                colorConnect="secondary"
                colorDisconnect="secondary"
              />
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
