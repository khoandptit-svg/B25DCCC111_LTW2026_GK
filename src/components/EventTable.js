import React from "react";
import EventRow from "./EventRow";

const EventTable = ({ events, onRegister, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Sự kiện</th>
          <th>Địa điểm</th>
          <th>Ngày</th>
          <th>Số chỗ</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {events.map((evt) => (
          <EventRow
            key={evt.id}
            event={evt}
            onRegister={onRegister}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;