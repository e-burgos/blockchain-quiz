export interface IQuetion {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: {
    text: string;
  }[];
}

export interface ISurveyData {
  surveyId: number;
  title: string;
  image: string;
  questions: IQuetion[];
}

export interface IQuetionReview {
  answerId: number;
  question: string;
  image: string;
  option: string;
}

export interface ISubmitResponse {
  hash: string;
  type: number;
  accessList: null;
  blockHash: null;
  blockNumber: null;
  transactionIndex: null;
  confirmations: number;
  from: string;
  maxPriorityFeePerGas: {
    type: string;
    hex: string;
  };
  maxFeePerGas: {
    type: string;
    hex: string;
  };
  gasPrice: {
    type: string;
    hex: string;
  };
  gasLimit: {
    type: string;
    hex: string;
  };
  to: string;
  value: {
    type: string;
    hex: string;
  };
  nonce: number;
  data: string;
  r: string;
  s: string;
  v: number;
  creates: null;
  chainId: number;
}
