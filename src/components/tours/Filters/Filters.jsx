import { FaUndo, FaSearch } from "react-icons/fa";
import "./Filters.css";

export default function Filters({
  query,
  availableOnly,
  onQueryChange,
  onAvailableOnlyChange,
  onReset,
}) {
  return (
    <div className="filters-container">
      <div className="filters-top-bar">
        <div className="search-box-wrapper">
          <input
            type="search"
            name="query"
            placeholder="Пошук туру за назвою..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="search-input"
          />
          <div className="search" aria-label="Знайти">
            <FaSearch />
          </div>
        </div>

        <button type="button" onClick={onReset} className="reset-filters-btn">
          <FaUndo /> Скинути фільтри
        </button>
      </div>

      <div className="filters-grid">
        <label className="filter-checkbox-card">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => onAvailableOnlyChange(e.target.checked)}
            className="custom-checkbox"
          />
          <div className="filter-card-text">
            <span className="filter-caption">Доступність місць</span>
            <span className="filter-val">Лише активні тури з місцями</span>
          </div>
        </label>
      </div>
    </div>
  );
}