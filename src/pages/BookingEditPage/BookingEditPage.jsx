import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";

import useBookings from "../../hooks/useBookings.js";

import BookingPage from "../BookingPage/BookingPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function BookingEditPage({ items = [] }) {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { bookings, updateBooking } = useBookings();

  const pageAlive = useRef(false);
  const activeId = useRef(bookingId);

  useEffect(() => {
    pageAlive.current = true;
    activeId.current = bookingId;

    return () => {
      pageAlive.current = false;
      activeId.current = null;
    };
  }, [bookingId]);

  const booking = bookings.find(
    (entry) => String(entry.id) === String(bookingId)
  );

  if (!booking) {
    return (
      <NotFoundPage
        title="Заявку не знайдено"
        message={`Заявку «${bookingId}» для редагування не знайдено.`}
      />
    );
  }

  const tour = items.find(
    (entry) => String(entry.id) === String(booking.tourId)
  );

  if (!tour) {
    return (
      <NotFoundPage
        title="Тур не знайдено"
        message="Тур, пов'язаний із цією заявкою, відсутній у каталозі."
      />
    );
  }

  async function handleSave(input) {
    const result = await updateBooking(booking.id, input);

    if (
      result.ok &&
      pageAlive.current &&
      activeId.current === booking.id
    ) {
      navigate(
        `/bookings/${encodeURIComponent(result.record.id)}`,
        { replace: true }
      );
    }

    return result;
  }

  return (
    <BookingPage
      key={`edit-${booking.id}`}
      title={`Редагування заявки ${booking.id}`}
      tour={tour}
      initialDraft={{
        customerName: booking.customerName || "",
        customerPhone: booking.customerPhone || "",
        customerEmail: booking.customerEmail || "",
        travelersCount: booking.travelersCount || "1",
        needsTransfer: Boolean(booking.needsTransfer),
        notes: booking.notes || "",
      }}
      onSave={handleSave}
      submitLabel="Зберегти зміни"
      onCancel={() =>
        navigate(
          `/bookings/${encodeURIComponent(booking.id)}`
        )
      }
      cancelLabel="Скасувати редагування"
    />
  );
}