export function selectBookings(bookings, tours, { query = '', transfer = 'all', sort = 'tour' }) {
    const tourNames = new Map(tours.map((t) => [String(t.id), t.name]));
    const normalizedQuery = query.trim().toLocaleLowerCase('uk');
  
    const filtered = bookings.filter((booking) => {
      const tourName = tourNames.get(String(booking.tourId)) ?? '';
      const searchString = `${tourName} ${booking.customerName} ${booking.customerPhone} ${booking.notes ?? ''}`.toLocaleLowerCase('uk');
  
      const matchesQuery = searchString.includes(normalizedQuery);
      const matchesTransfer =
        transfer === 'all' ||
        (transfer === 'yes' ? booking.needsTransfer : !booking.needsTransfer);
  
      return matchesQuery && matchesTransfer;
    });
  
    return filtered.sort((a, b) => {
      if (sort === 'travelers-asc') {
        return a.travelersCount - b.travelersCount || a.id.localeCompare(b.id);
      }
      if (sort === 'travelers-desc') {
        return b.travelersCount - a.travelersCount || a.id.localeCompare(b.id);
      }
      if (sort === 'client') {
        return a.customerName.localeCompare(b.customerName, 'uk') || a.id.localeCompare(b.id);
      }
  
      const nameA = tourNames.get(String(a.tourId)) ?? '';
      const nameB = tourNames.get(String(b.tourId)) ?? '';
      return nameA.localeCompare(nameB, 'uk') || a.id.localeCompare(b.id);
    });
  }