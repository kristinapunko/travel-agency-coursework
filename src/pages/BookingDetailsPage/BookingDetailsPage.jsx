import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import PageHeading from "../../components/ui/PageHeading.jsx";
import AppButton from "../../components/ui/AppButton.jsx";
import useBookings from "../../hooks/useBookings.js";
import useDeleteBooking from "../../hooks/useDeleteBooking.js";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";

import "./BookingDetailsPage.css";

export default function BookingDetailsPage({ items = [] }) {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { bookings } = useBookings();
  const deleteWithConfirmation = useDeleteBooking(items);

  const [error, setError] = useState("");

  const booking = bookings.find(
    (b) => String(b.id) === String(bookingId)
  );

  if (!booking) {
    return (
      <NotFoundPage
        title="Заявку не знайдено"
        message={`Заявку «${bookingId}» не знайдено або її було вилучено з колекції.`}
      />
    );
  }

  const tour = items.find(
    (t) => String(t.id) === String(booking.tourId)
  );

  function handleDelete() {
    setError("");

    const result = deleteWithConfirmation(booking);

    if (result.ok) {
      navigate("/bookings", { replace: true });
    } else if (!result.cancelled) {
      setError(result.message);
    }
  }

  return (
    <div className="bookings-page">
      <PageHeading title={`Заявка: ${booking.id}`} />

      <div className="bookings-section">
        <div className="bookings-section-header">
          <div>
            <h2>Деталі заявки</h2>
            <p>
              Інформація про бронювання та контактні дані клієнта.
            </p>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            style={{
              color: "#dc2626",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <div className="table-scroll">
          <table className="requests-table">
            <tbody>
              <tr>
                <th>Тур</th>
                <td>
                  <div className="booking-tour">
                    <span className="booking-tour-name">
                      {tour?.name ?? "Тур відсутній у каталозі"}
                    </span>

                    {tour?.country && (
                      <span className="booking-tour-country">
                        {tour.country}
                      </span>
                    )}
                  </div>
                </td>
              </tr>

              <tr>
                <th>Клієнт</th>
                <td>
                  <div className="booking-customer">
                    <strong>{booking.customerName}</strong>
                    <span>{booking.customerPhone}</span>
                    <span>{booking.customerEmail}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>Кількість туристів</th>
                <td>{booking.travelersCount} осіб</td>
              </tr>

              <tr>
                <th>Трансфер</th>
                <td>
                  <span
                    className={`transfer-badge ${
                      booking.needsTransfer
                        ? "transfer-yes"
                        : "transfer-no"
                    }`}
                  >
                    {booking.needsTransfer
                      ? "Так, увімкнено"
                      : "Ні, не потрібен"}
                  </span>
                </td>
              </tr>

              <tr>
                <th>Примітки</th>
                <td>{booking.notes || "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="bookings-section-header"
          style={{
            marginTop: "1.5rem",
            marginBottom: 0,
          }}
        >
          <div>
            <Link
              to={`/bookings/${encodeURIComponent(
                booking.id
              )}/edit`}
            >
              <AppButton variant="primary">
                Редагувати заявку
              </AppButton>
            </Link>

            <AppButton
              variant="secondary"
              onClick={handleDelete}
              style={{ marginLeft: "1rem" }}
            >
              Видалити заявку
            </AppButton>
          </div>

          <Link to="/bookings">
            ← До списку всіх заявок
          </Link>
        </div>
      </div>
    </div>
  );
}