export interface IQuetion {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: {
    text: string;
  }[];
}

export interface ISurveyData {
  title: string;
  image: string;
  questions: IQuetion[];
}

export interface IQuetionReview {
  question: string;
  image: string;
  option: string;
}
