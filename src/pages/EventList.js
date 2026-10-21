import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

const EventList = ({ events, onRegister, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const filteredEvents = events.filter((evt) => {
    const matchesSearch = evt.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesStatus = true;
    if (filterStatus === "Còn chỗ") {
      matchesStatus = evt.registered < evt.capacity;
    } else if (filterStatus === "Đã đầy") {
      matchesStatus = evt.registered === evt.capacity;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
      />

      {filteredEvents.length > 0 ? (
        <>
          <div>Tìm thấy {filteredEvents.length} sự kiện</div>
          <EventTable
            events={filteredEvents}
            onRegister={onRegister}
            onDelete={onDelete}
          />
        </>
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};

export default EventList;