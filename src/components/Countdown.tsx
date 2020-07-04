import React, { useState, useEffect } from "react";

export default function Countdown() {
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const timer =
      counter >= 0 && setTimeout(() => setCounter(counter - 1), 1000);
    const timeUp = counter < 0 && console.log("time up!");
  });

  return <div>{counter >= 0 ? counter : 0}</div>;
}
