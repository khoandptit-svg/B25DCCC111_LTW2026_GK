import React, { useState, useEffect } from "react";

const Countdown = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(`${date}T00:00:00`);
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft("Sự kiện đã diễn ra");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return <div>{timeLeft}</div>;
};

export default Countdown;