import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  time: number;
}

const Counter: React.FC<CountdownTimerProps> = ({ time }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(time);

  useEffect(() => {
    setSecondsRemaining(time);
  }, [time]);

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
    <div className="countdown-timer p-2 bg-black w-auto">
      <p className="text-3xl font-mono text-center text-white">
        {formatTime(secondsRemaining)}
      </p>
    </div>
  );
};

export default Counter;
