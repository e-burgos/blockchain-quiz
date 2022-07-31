import React, { FunctionComponent } from 'react'
import { Typography, Grid } from '@mui/material'
import failureSvg from '../../public/assets/failure.svg'
import Image from 'next/image'
import styles from './styles/error-container.module.css'

const ErrorContainer: FunctionComponent = () => {
  return (
    <Grid
      height="400px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={failureSvg} width="100px" alt="error" />
      <Typography variant="h5" className={styles.text} gutterBottom>
        An unexpected error occurred, please try again later, thanks!
      </Typography>
    </Grid>
  )
}

export default ErrorContainer
