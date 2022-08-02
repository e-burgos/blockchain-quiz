import React, { FunctionComponent } from "react";
import { Typography, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styles from "./styles/info-container.module.css";

interface Props {
  message: string;
  isError?: boolean;
  isSuccess?: boolean;
  textVariant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | undefined;
}

const InfoContainer: FunctionComponent<Props> = ({
  message,
  isError,
  isSuccess,
  textVariant,
}) => {
  return (
    <Grid className={styles.container}>
      {isError && <HighlightOffIcon color="error" sx={{ fontSize: 60 }} />}
      {isSuccess && <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />}
      <Typography
        variant={textVariant ?? "h5"}
        className={styles.text}
        gutterBottom
      >
        {message}
      </Typography>
    </Grid>
  );
};

export default InfoContainer;
