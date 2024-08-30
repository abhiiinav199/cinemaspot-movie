import React from 'react';

const Dropdown = ({ filters, placeholder, func, value }) => {
  return (
    <div className="relative">
      <select
        className="p-2 text-white bg-gray-800 rounded-lg shadow-lg outline-none"
        name={placeholder}
        onChange={func}
        value={value}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {filters.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
