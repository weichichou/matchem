import React, { useState } from "react";

export default function Countdown() {
  const [sec, setSec] = useState(29);
  const [started, setStarted] = useState(false);
  let targetTime: number;
  function getTargetTime() {
    setStarted(true);
    let start = Date.now();
    targetTime = start + 30000;
    console.log("targetTime", targetTime);
    countdown();
  }

  function countdown() {
    const id = setInterval(calculateRemainingTime, 200);
    function calculateRemainingTime() {
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        clearInterval(id);
        console.log("time up");
      } else {
        setSec(Math.floor(difference / 1000));
        console.log("difference", difference);
      }
    }
  }

  return (
    <div>
      {started ? (
        <div>{sec < 10 ? `0${sec}` : sec}</div>
      ) : (
        <button onClick={getTargetTime}>Start</button>
      )}
    </div>
  );
}
