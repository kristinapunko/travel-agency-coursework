import { useState } from "react";
import { TourSelectionContext } from "../context/TourSelectionContext";

export default function TourSelectionProvider({ items, children }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedTour = items.find((tour) => tour.id === selectedId) || null;

  function selectTour(id) {
    if (items.some((tour) => tour.id === id)) {
      setSelectedId(id);
    }
  }

  function clearSelection() {
    setSelectedId(null);
  }

  const value = {
    selectedId,
    selectedTour,
    selectTour,
    clearSelection,
  };

  return (
    <TourSelectionContext.Provider value={value}>
      {children}
    </TourSelectionContext.Provider>
  );
}