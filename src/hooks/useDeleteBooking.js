import { useCallback } from 'react';
import useBookings from './useBookings.js';

export default function useDeleteBooking(tours = []) {
  const { deleteBooking } = useBookings();

  return useCallback(
    async (booking) => {
      const tour = tours.find(
        (t) => String(t.id) === String(booking.tourId)
      );

      const tourTitle = tour?.name ?? `Тур #${booking.tourId}`;

      const confirmed = window.confirm(
        `Видалити заявку ${booking.id} на «${tourTitle}» (Клієнт: ${booking.customerName})?\n` +
          'Запис буде видалено без можливості відновлення.'
      );

      if (!confirmed) {
        return { ok: false, cancelled: true };
      }

      return deleteBooking(booking.id);
    },
    [tours, deleteBooking]
  );
}