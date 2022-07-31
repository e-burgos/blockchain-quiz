import React, { useEffect, useCallback, useState } from 'react'
import { useWeb3Context } from '../../context'
import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { Grid, Typography } from '@mui/material'
import styles from './styles/web3-info.module.css'

export function Web3Balance() {
  const { web3Provider, address } = useWeb3Context()
  const [balance, setBalance] = useState<string>('')

  useEffect(() => {
    if (web3Provider && address) {
      fetchBalance(web3Provider, address)
    } else {
      setBalance('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Provider, address])

  const fetchBalance = useCallback(
    async (web3Provider: ethers.providers.Web3Provider, address: string) => {
      const balance = await web3Provider.getBalance(address)
      setBalance(formatEther(balance))
    },
    []
  )

  return (
    <Grid className={styles.container}>
      <Typography variant="overline">Your Balance</Typography>
      <Typography variant="overline">{balance}</Typography>
    </Grid>
  )
}
