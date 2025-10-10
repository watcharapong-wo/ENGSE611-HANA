// src/components/Clock.js
import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);   // cleanup ตอน unmount
  }, []);
  return <p>Current time: <strong>{time.toLocaleTimeString()}</strong></p>;
}
