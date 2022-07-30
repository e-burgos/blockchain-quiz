import axios from "axios";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_API_URI } from "../utils/consts";
import { ISurveyData } from "../utils/types";

export function useData() {
  const [data, setData] = useState<ISurveyData>();
  const [error, setError] = useState<boolean>(false);
  const getSurvey = async () => {
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URI}/data/survey-sample.json`
      );
      setData(response.data);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    getSurvey();
  }, []);

  return { data, error };
}
