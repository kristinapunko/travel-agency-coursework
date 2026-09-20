import Section from "../../components/ui/Section";
import CatalogSummary from "../../components/tours/CatalogSummary/CatalogSummary";
import Filters from "../../components/tours/Filters/Filters";
import TourList from "../../components/tours/TourList/TourList";
import useTourFilters from "../../hooks/useTourFilters";
import "./HomePage.css";

export default function HomePage({ items, selectedId, onSelect }) {
  const {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  } = useTourFilters(items);

  return (
    <div className="home-page">
      <Section id="about" title="Про наше турагентство">
        <p>
          Ми організовуємо незабутні подорожі та відпочинок у наймальовничіших куточках світу.
        </p>
        <p>
          Оберіть тур з каталогу нижче та перейдіть до оформлення попередньої заявки на бронювання.
        </p>
      </Section>

      <Section id="catalog" title="Каталог турів">
        <CatalogSummary total={items.length} />

        <Filters
          query={query}
          availableOnly={availableOnly}
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
          onReset={resetFilters}
        />

        <p className="visible-count-text">
          Показано турів за поточними фільтрами: <strong>{visibleItems.length}</strong>
        </p>

        <TourList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={
            items.length === 0
              ? "Тури ще не додані до каталогу."
              : "За цими критеріями пошуку турів не знайдено."
          }
        />

        <p className="go-to-booking-link">
          <a href="#booking">↓ Перейти до підготовки заявки</a>
        </p>
      </Section>
    </div>
  );
}