import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ onAddEvent }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !date || capacity === "") {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const capNum = Number(capacity);
    if (!Number.isInteger(capNum) || capNum < 10 || capNum > 1000) {
      setErrorMessage("Sức chứa phải từ 10 đến 1000");
      return;
    }

    onAddEvent({
      name,
      location,
      date,
      capacity: capNum,
    });

    navigate("/events", { replace: true });
  };

  return (
    <div>
      <h2>Thêm sự kiện mới</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên sự kiện</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Địa điểm</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Ngày diễn ra</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="capacity">Sức chứa</label>
          <input
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>

        <button type="submit">Thêm</button>
      </form>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default AddEvent;