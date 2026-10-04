import { useSearchParams } from "react-router";

export default function useBookingFilters(bookings = [], tours = []) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const rawTransfer = searchParams.get("transfer");
  const transfer = ["yes", "no"].includes(rawTransfer)
    ? rawTransfer
    : "all";

  const rawSort = searchParams.get("sort");
  const sort = ["travelers-asc", "travelers-desc", "client"].includes(rawSort)
    ? rawSort
    : "tour";

  const tourNames = new Map(
    tours.map((tour) => [String(tour.id), tour.name])
  );

  const normalizedQuery = query.trim().toLocaleLowerCase("uk");

  const visibleBookings = bookings.filter((booking) => {
    const tourName = tourNames.get(String(booking.tourId)) ?? "";

    const searchString = `${tourName} ${booking.customerName} ${
      booking.customerPhone
    } ${booking.notes ?? ""}`.toLocaleLowerCase("uk");

    const matchesQuery = searchString.includes(normalizedQuery);

    const matchesTransfer =
      transfer === "all" ||
      (transfer === "yes"
        ? booking.needsTransfer
        : !booking.needsTransfer);

    return matchesQuery && matchesTransfer;
  });

  visibleBookings.sort((a, b) => {
    if (sort === "travelers-asc") {
      return (
        a.travelersCount - b.travelersCount ||
        a.id.localeCompare(b.id)
      );
    }

    if (sort === "travelers-desc") {
      return (
        b.travelersCount - a.travelersCount ||
        a.id.localeCompare(b.id)
      );
    }

    if (sort === "client") {
      return (
        a.customerName.localeCompare(b.customerName, "uk") ||
        a.id.localeCompare(b.id)
      );
    }

    const nameA = tourNames.get(String(a.tourId)) ?? "";
    const nameB = tourNames.get(String(b.tourId)) ?? "";

    return (
      nameA.localeCompare(nameB, "uk") ||
      a.id.localeCompare(b.id)
    );
  });

  function setParameter(name, value, defaultValue, replace = false) {
    const next = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      next.delete(name);
    } else {
      next.set(name, value);
    }

    setSearchParams(next, { replace });
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams);

    next.delete("q");
    next.delete("transfer");
    next.delete("sort");

    setSearchParams(next);
  }

  return {
    query,
    transfer,
    sort,
    visibleBookings,
    setQuery: (value) => setParameter("q", value, "", true),
    setTransfer: (value) => setParameter("transfer", value, "all"),
    setSort: (value) => setParameter("sort", value, "tour"),
    resetFilters,
  };
}