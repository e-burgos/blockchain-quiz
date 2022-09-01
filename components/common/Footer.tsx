import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import styles from "./styles/footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          target="_blank"
          href="https://www.estebanburgos.com.ar/"
        >
          Esteban Burgos
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
