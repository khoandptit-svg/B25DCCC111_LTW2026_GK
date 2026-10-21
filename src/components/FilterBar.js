import React from "react";

const FilterBar = ({ searchTerm, onSearchChange, filterStatus, onStatusChange }) => {
  return (
    <div className="filter-bar">
      <label htmlFor="search">
        Tìm kiếm{" "}
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <label htmlFor="status">
        Tình trạng{" "}
        <select
          id="status"
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Còn chỗ">Còn chỗ</option>
          <option value="Đã đầy">Đã đầy</option>
        </select>
      </label>
    </div>
  );
};

export default FilterBar;