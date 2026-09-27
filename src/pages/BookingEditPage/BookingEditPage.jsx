import { useNavigate, useParams } from "react-router";

import BookingPage from "../BookingPage/BookingPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function BookingEditPage({ bookings = [], items = [] }) {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = bookings.find(
    (entry) => String(entry.id) === String(bookingId)
  );

  if (!booking) {
    return (
      <NotFoundPage
        title="Заявку не знайдено"
        message={`Заявку «${bookingId}» не знайдено серед збережених записів.`}
      />
    );
  }

  const tour = items.find((entry) => String(entry.id) === String(booking.tourId));

  if (!tour) {
    return (
      <NotFoundPage
        title="Тур не знайдено"
        message="Предмет цієї заявки відсутній у каталозі."
      />
    );
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
        notes: booking.notes || "",
        needsTransfer: Boolean(booking.needsTransfer),
      }}
      onCancel={() => navigate("/bookings")}
      cancelLabel="Повернутися до списку заявок"
    />
  );
}