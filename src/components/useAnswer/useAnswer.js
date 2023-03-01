import { useEffect, useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

export const useAnswer = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState("loading");

  const fetchAnswer = async () => {
    try {
      const answer = sample(WORDS);
      setData(answer);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnswer();
  }, []);

  return { data, status, refetch: fetchAnswer };
};
