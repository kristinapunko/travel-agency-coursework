import HomePage from "./HomePage/HomePage";
import useTourSelection from "../hooks/useTourSelection";

export default function CatalogContainer({ items }) {
  const { selectedId, selectTour } = useTourSelection();

  return (
    <HomePage
      items={items}
      selectedId={selectedId}
      onSelect={selectTour}
    />
  );
}