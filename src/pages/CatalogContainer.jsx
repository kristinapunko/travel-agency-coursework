import TourListPage from "./TourListPage/TourListPage";
import useTourSelection from "../hooks/useTourSelection";

export default function CatalogContainer({ items }) {
  const { selectedId, selectTour } = useTourSelection();

  return (
    <TourListPage
      items={items}
      selectedId={selectedId}
      onSelect={selectTour}
    />
  );
}