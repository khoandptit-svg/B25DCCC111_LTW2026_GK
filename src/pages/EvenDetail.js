import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Countdown from "../components/CountDown";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((evt) => evt.id === Number(id));

  if (!event) {
    return <div>Không tìm thấy sự kiện</div>;
  }

  return (
    <div>
      <div>Tên sự kiện: {event.name}</div>
      <div>Địa điểm: {event.location}</div>
      <div>Ngày: {event.date}</div>
      <div>
        Số chỗ: {event.registered}/{event.capacity}
      </div>
      <Countdown date={event.date} />
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default EventDetail;