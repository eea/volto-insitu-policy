function SearchInput({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing to filter by any column value"
        className="search-input"
      />
      <div className="search-icon">
        <svg
          className="search-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 36 36"
        >
          <path
            fill="none"
            fillRule="evenodd"
            d="M7,16 C7,11.038 11.037,7 16,7 C20.963,7 25,11.038 25,16 C25,20.962 20.963,25 16,25 C11.037,25 7,20.962 7,16 L7,16 Z M32.707,31.293 L24.448,23.034 C26.039,21.125 27,18.673 27,16 C27,9.935 22.065,5 16,5 C9.935,5 5,9.935 5,16 C5,22.065 9.935,27 16,27 C18.673,27 21.125,26.039 23.034,24.448 L31.293,32.707 L32.707,31.293 Z"
            stroke="#74625e"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

export default SearchInput;
