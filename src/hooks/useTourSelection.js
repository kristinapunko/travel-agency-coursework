import { useContext } from "react";
import { TourSelectionContext } from "../context/TourSelectionContext";

export default function useTourSelection() {
  const context = useContext(TourSelectionContext);

  if (context === null) {
    throw new Error(
      "useTourSelection must be used within a TourSelectionProvider"
    );
  }

  return context;
}