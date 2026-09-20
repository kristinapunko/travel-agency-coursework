import TourCard from "../TourCard/TourCard";
import EmptyState from "../../ui/EmptyState";
import "./TourList.css";

export default function TourList({ items }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState title="Наразі актуальні тури відсутні">
        <p>
          Завітайте пізніше або зверніться до менеджера для індивідуального
          підбору.
        </p>
      </EmptyState>
    );
  }

  return (
    <ul className="tour-grid">
      {items.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </ul>
  );
}
