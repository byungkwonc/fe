import React from "react";
import { format } from "date-fns";

import useRealTime from "../hooks/useRealTime";

export default function TimeSection({ dateTime, title, description }) {
  const cleanDate = dateTime && format(new Date(dateTime), "kk:mm:ss O");

  const realTime = useRealTime();

  return (
    <section>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <h2>{cleanDate ? cleanDate : "LOADING..."}</h2>
      </div>

      <div>
        <p>Real Time:</p>
        <p>{realTime}</p>
      </div>
    </section>
  );
}