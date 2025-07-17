import React, { useState } from 'react';

function SearchBar({ search, onSearch, dateRange, onDateRange }) {
  const [inputValue, setInputValue] = useState(search);
  const [localDateRange, setLocalDateRange] = useState(dateRange);

  const handleSearchClick = () => {
    // Выполняем поиск по названию
    onSearch(inputValue);
    // Применяем фильтр по датам
    onDateRange(localDateRange);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      onDateRange(localDateRange);
    }
  };

  const handleDateChange = (field, value) => {
    setLocalDateRange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="search-section">
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <div className="search-input-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Поиск по названию..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <svg 
            className="search-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSearchClick}
          >
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <input
          className="date-input"
          type="date"
          value={localDateRange.start}
          onChange={e => handleDateChange('start', e.target.value)}
        />
        <input
          className="date-input"
          type="date"
          value={localDateRange.end}
          onChange={e => handleDateChange('end', e.target.value)}
        />
      </form>
    </section>
  );
}

export default SearchBar; 