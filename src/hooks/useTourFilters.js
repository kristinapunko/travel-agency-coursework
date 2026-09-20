import { useState } from "react";

export default function useTourFilters(items = []) {
  const [query, setQuery] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const normalizedQuery = query.trim().toLocaleLowerCase("uk");

  const visibleItems = items.filter((tour) => {
    const matchesName = tour.name
      .toLocaleLowerCase("uk")
      .includes(normalizedQuery);

    const matchesAvailability = !availableOnly || tour.isAvailable;

    return matchesName && matchesAvailability;
  });

  function resetFilters() {
    setQuery("");
    setAvailableOnly(false);
  }

  return {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  };
}