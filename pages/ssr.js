import React from "react";
import axios from "axios";

import TimeSection from "../components/timesection";

export default function SSRPage({ dateTime }) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>SSR Time</h1>
      <main>
        <TimeSection title="SSR" dateTime={dateTime} />
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("https://worldtimeapi.org/api/ip");

  return {
    props: { dateTime: res.data.datetime },
  };
};