import React from "react";
import { format } from "date-fns";

export default function useRealTime() {
  const [realTime, setRealTime] = React.useState(
    format(new Date(), "kk:mm:ss O")
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setRealTime(format(new Date(), "kk:mm:ss O"));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return realTime;
}