import React from 'react';

const SortButtons = ({ columnId, handleSort }) => (
  <div className="sort-buttons">
    <button
      onClick={() => handleSort(columnId, 'asc')}
      aria-label={`Sort ${columnId} ascending`}
    >
      <span role="img" aria-label="sort ascending">
        🔼
      </span>
    </button>
    <button
      onClick={() => handleSort(columnId, 'desc')}
      aria-label={`Sort ${columnId} descending`}
    >
      <span role="img" aria-label="sort descending">
        🔽
      </span>
    </button>
  </div>
);

export default SortButtons;
