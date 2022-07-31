import React from "react";
import { Button } from "@mui/material";
import { useWeb3Context } from "../../context";

type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | undefined;

interface ConnectProps {
  connect: (() => Promise<void>) | null;
  color?: ButtonColor;
}
const ConnectButton = ({ color, connect }: ConnectProps) => {
  return connect ? (
    <Button variant="contained" color={color} onClick={connect}>
      {"Connect Wallet"}
    </Button>
  ) : (
    <Button variant="contained">{">Loading..."}</Button>
  );
};

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null;
  color?: ButtonColor;
}

const DisconnectButton = ({ color, disconnect }: DisconnectProps) => {
  return disconnect ? (
    <Button variant="contained" color={color} onClick={disconnect}>
      {"Disconnect"}
    </Button>
  ) : (
    <Button variant="contained">{">Loading..."}</Button>
  );
};

export function Web3Button(props: {
  colorConnect?: ButtonColor;
  colorDisconnect?: ButtonColor;
}) {
  const { web3Provider, connect, disconnect } = useWeb3Context();
  return web3Provider ? (
    <DisconnectButton color={props.colorDisconnect} disconnect={disconnect} />
  ) : (
    <ConnectButton color={props.colorConnect} connect={connect} />
  );
}
