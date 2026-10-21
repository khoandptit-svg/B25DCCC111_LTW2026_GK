import React from "react";
import EventTable from "../components/EventTable";

const EventList = ({ events, onRegister, onDelete }) => {
  return (
    <div>
      <EventTable
        events={events}
        onRegister={onRegister}
        onDelete={onDelete}
      />
    </div>
  );
};

export default EventList;