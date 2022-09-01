import * as React from "react";
import { Web3QuizTotalSupply } from "./Web3QuizTotalSupply";
import styles from "./styles/web3-contract-container.module.css";
import { Web3QuizSymbol } from "./Web3QuizSymbol";
import { Web3QuizName } from "./Web3QuizName";
import { Web3QuizLastSubmittal } from "./Web3QuizLastSubmittal";
import { Web3QuizCoolDown } from "./Web3QuizCoolDown";

const Web3ContractContainer: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Web3QuizTotalSupply />
      <Web3QuizSymbol />
      <Web3QuizName />
      <Web3QuizLastSubmittal />
      <Web3QuizCoolDown />
    </div>
  );
};

export default Web3ContractContainer;
