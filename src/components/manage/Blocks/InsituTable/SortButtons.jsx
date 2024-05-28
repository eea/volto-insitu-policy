import React from 'react';

const SortButtons = ({ columnId, handleSort, currentSorting }) => {
  const isSorted = currentSorting.find((sort) => sort.id === columnId);
  const direction = isSorted ? (isSorted.desc ? 'desc' : 'asc') : null;

  const handleButtonClick = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    handleSort(columnId, newDirection);
  };

  return (
    <span className="sort-buttons">
      {direction === null ? (
        <>
          <button
            className="sort-button"
            onClick={() => handleSort(columnId, 'asc')}
            title={`Sort ${columnId} ascending`}
          >
            ▲
          </button>
          <button
            className="sort-button"
            onClick={() => handleSort(columnId, 'desc')}
            title={`Sort ${columnId} descending`}
          >
            ▼
          </button>
        </>
      ) : (
        <button
          className="sort-button"
          onClick={handleButtonClick}
          title={`Sort ${columnId} ${
            direction === 'asc' ? 'descending' : 'ascending'
          }`}
        >
          {direction === 'asc' ? '▲' : '▼'}
        </button>
      )}
    </span>
  );
};

export default SortButtons;
