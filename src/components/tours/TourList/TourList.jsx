import TourCard from "../TourCard/TourCard";
import EmptyState from "../../ui/EmptyState";
import "./TourList.css";

export default function TourList({
  items,
  selectedId,
  onSelect,
  emptyTitle = "Турів ще не додано.",
}) {
  if (!items || items.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <ul className="tour-grid">
      {items.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          selected={tour.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}