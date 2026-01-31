"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  // Offer end time as a future Date string
  endTime: string;
}

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // If offer ended
  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return <span className="text-red-500 font-bold">Offer expired!</span>;
  }

  return (
    <div className="text-sm text-red-600 font-semibold mt-1">
      Hurry! Offer ends in:{" "}
      {timeLeft.days > 0 && `${timeLeft.days}d `} 
      {timeLeft.hours.toString().padStart(2, "0")}h : 
      {timeLeft.minutes.toString().padStart(2, "0")}m : 
      {timeLeft.seconds.toString().padStart(2, "0")}s
    </div>
  );
}
