import { Link } from "react-router";
import PageHeading from "../../components/ui/PageHeading";
import Section from "../../components/ui/Section";
import CatalogSummary from "../../components/tours/CatalogSummary/CatalogSummary";
import Filters from "../../components/tours/Filters/Filters";
import TourList from "../../components/tours/TourList/TourList";
import AppButton from "../../components/ui/AppButton";
import useTourFilters from "../../hooks/useTourFilters";

import "./TourListPage.css";

export default function TourListPage({
  items,
  selectedId,
  onSelect,
}) {
  const {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  } = useTourFilters(items);

  const requestSearch = selectedId
    ? `?${new URLSearchParams({ tourId: selectedId })}`
    : "";

  return (
    <div className="container tour-list-page">
      <PageHeading title="Каталог турів" />

      <Section
        id="catalog-filters"
        title="Фільтрація та пошук"
      >
        <CatalogSummary total={items.length} />

        <Filters
          query={query}
          availableOnly={availableOnly}
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
          onReset={resetFilters}
        />

        <div className="tour-list-page__toolbar">
          <p className="visible-count-text">
            Показано турів:{" "}
            <strong>{visibleItems.length}</strong>
          </p>

          {selectedId && (
            <Link to={`/bookings/new${requestSearch}`}>
              <AppButton variant="primary">
                Оформити вибраний тур
              </AppButton>
            </Link>
          )}
        </div>

        <TourList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={
            items.length === 0
              ? "Тури ще не додані до каталогу."
              : "За цими критеріями турів не знайдено."
          }
        />
      </Section>
    </div>
  );
}