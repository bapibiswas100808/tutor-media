"use client";

import { useEffect, useState, useCallback } from "react";

interface CountdownTimerProps {
  /** Offer end time as a future Date string */
  endTime: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const difference = new Date(endTime).getTime() - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [endTime]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Offer expired
  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <span className="text-red-600 font-bold">
        Offer expired!
      </span>
    );
  }

  return (
    <div className="text-sm text-red-600 font-semibold mt-2">
      Hurry! Offer ends in:{" "}
      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
      <span>
        {timeLeft.hours.toString().padStart(2, "0")}h :{" "}
        {timeLeft.minutes.toString().padStart(2, "0")}m :{" "}
        {timeLeft.seconds.toString().padStart(2, "0")}s
      </span>
    </div>
  );
}
