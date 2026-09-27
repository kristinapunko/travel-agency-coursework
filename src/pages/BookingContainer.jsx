import BookingPage from "./BookingsPage/BookingsPage";
import useTourSelection from "../hooks/useTourSelection";

export default function BookingContainer() {
  const { selectedId, selectedTour, clearSelection } = useTourSelection();

  return (
    <BookingPage
      key={selectedId ?? "empty"}
      selectedTour={selectedTour}
      onClearSelection={clearSelection}
    />
  );
}