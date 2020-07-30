import React, { useState, useEffect } from "react";

export default function Countdown() {
  let targetTime: number;
  function getTargetTime() {
    let start = Date.now();
    targetTime = start + 30000;
    console.log("targetTime", targetTime);
    countdown();
  }

  function countdown() {
    const id = setInterval(calculateRemainingTime, 500);
    function calculateRemainingTime() {
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        clearInterval(id);
        console.log("time up");
      } else {
        console.log("difference", difference);
      }
    }
  }

  return (
    <div>
      <button onClick={getTargetTime}>Start</button>
    </div>
  );
}
