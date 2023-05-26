import React from "react";
import axios from "axios";

import TimeSection from "../components/timesection";

export default function Home() {
  const [dateTime, setDateTime] = React.useState("");

  React.useEffect(() => {
    axios
      .get("https://worldtimeapi.org/api/ip")
      .then((res) => {
        setDateTime(res.data.datetime);
        return res.data.datetime;
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>CSR Time</h1>
      <main>
        <TimeSection
          title="CSR"
          description="렌더될때마다 클라이언트 사이드에서 fetch 됩니다."
          dateTime={dateTime}
        />
      </main>
    </div>
  );
}
