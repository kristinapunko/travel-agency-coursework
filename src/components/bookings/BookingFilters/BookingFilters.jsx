import { FaUndo, FaSearch } from "react-icons/fa";

import "./BookingFilters.css";

export default function BookingFilters({
  query,
  transfer,
  sort,
  onQueryChange,
  onTransferChange,
  onSortChange,
  onReset,
}) {
  return (
    <div className="filters-container">
      <div className="filters-top-bar">
        <div className="search-box-wrapper">
          <input
            type="search"
            name="query"
            placeholder="Пошук заявки за туром, ім'ям, телефоном..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="search-input"
          />

          <div className="search" aria-label="Знайти">
            <FaSearch />
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="reset-filters-btn"
        >
          <FaUndo />
          Скинути фільтри
        </button>
      </div>

      <div className="filters-grid">
        <label className="filter-checkbox-card">
          <div className="filter-card-text">
            <span className="filter-caption">
              Трансфер
            </span>

            <select
              value={transfer}
              onChange={(e) => onTransferChange(e.target.value)}
              className="filter-select"
            >
              <option value="all">Усі заявки</option>
              <option value="yes">Тільки з трансфером</option>
              <option value="no">Без трансферу</option>
            </select>
          </div>
        </label>

        <label className="filter-checkbox-card">
          <div className="filter-card-text">
            <span className="filter-caption">
              Сортування
            </span>

            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="filter-select"
            >
              <option value="tour">
                За назвою туру
              </option>

              <option value="client">
                За ім'ям клієнта
              </option>

              <option value="travelers-asc">
                Спочатку менше осіб
              </option>

              <option value="travelers-desc">
                Спочатку більше осіб
              </option>
            </select>
          </div>
        </label>
      </div>
    </div>
  );
}