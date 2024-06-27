import React, { useState, useEffect, FC } from "react";

interface CountdownTimerProps {
  time: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ time }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(time);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="countdown-timer">
      <p className="text-2xl font-mono">{formatTime(secondsRemaining)}</p>
    </div>
  );
};

export default CountdownTimer;
