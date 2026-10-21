import React from "react";

const Home = ({ events }) => {
  const totalEvents = events.length;

  const totalRegistered = events.reduce(
    (sum, event) => sum + event.registered,
    0
  );

  const fullEventsCount = events.reduce(
    (count, event) => (event.registered === event.capacity ? count + 1 : count),
    0
  );

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <div>Tổng số sự kiện: {totalEvents}</div>
      <div>Tổng số lượt đăng ký: {totalRegistered}</div>
      <div>Số sự kiện đã đầy: {fullEventsCount}</div>
    </div>
  );
};

export default Home;