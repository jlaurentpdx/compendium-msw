import styles from './Controls.css';

export default function Controls({ query, setQuery, handleSearch }) {
  return (
    <form className={styles.controls}>
      <label>
        <input
          aria-label="enter holiday name"
          type="text"
          placeholder="search for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <label>
        <button aria-label="search" onClick={handleSearch}>
          Search
        </button>
      </label>
    </form>
  );
}
