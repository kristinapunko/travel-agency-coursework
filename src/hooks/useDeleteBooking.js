import useBookings from "./useBookings.js";

export default function useDeleteBooking(tours = []) {
  const { deleteBooking } = useBookings();

  return function deleteWithConfirmation(booking) {
    const tour = tours.find(
      (t) => String(t.id) === String(booking.tourId)
    );

    const tourTitle =
      tour?.name ?? `Тур #${booking.tourId}`;

    const confirmed = window.confirm(
      `Видалити заявку ${booking.id} на «${tourTitle}» (Клієнт: ${booking.customerName})?\n` +
        "Запис буде видалено з поточної сесії без можливості відновлення."
    );

    if (!confirmed) {
      return {
        ok: false,
        cancelled: true,
      };
    }

    return deleteBooking(booking.id);
  };
}