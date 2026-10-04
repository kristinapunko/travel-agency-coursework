import { useState } from "react";
import { Link } from "react-router";

import PageHeading from "../../components/ui/PageHeading";
import EmptyState from "../../components/ui/EmptyState";
import AppButton from "../../components/ui/AppButton";
import BookingFilters from "../../components/bookings/BookingFilters/BookingFilters";
import BookingTable from "../../components/bookings/BookingTable/BookingTable";
import useBookings from "../../hooks/useBookings";
import useBookingFilters from "../../hooks/useBookingFilters";
import useDeleteBooking from "../../hooks/useDeleteBooking";

import "./BookingsPage.css";

export default function BookingsPage({ items = [] }) {
  const { bookings } = useBookings();

  const filters = useBookingFilters(bookings, items);

  const deleteWithConfirmation = useDeleteBooking(items);

  const [error, setError] = useState("");

  function handleDelete(booking) {
    setError("");

    const result = deleteWithConfirmation(booking);

    if (!result.ok && !result.cancelled) {
      setError(result.message);
    }
  }

  return (
    <div className="bookings-page">
      <PageHeading title="Список заявок на тури" />

      <p className="bookings-page-description">
        Нижче наведено локальні демонстраційні записи ваших заявок.
      </p>

      <BookingFilters
        query={filters.query}
        transfer={filters.transfer}
        sort={filters.sort}
        onQueryChange={filters.setQuery}
        onTransferChange={filters.setTransfer}
        onSortChange={filters.setSort}
        onReset={filters.resetFilters}
      />

      <p className="bookings-page-description">
        Показано заявок:{" "}
        <strong>{filters.visibleBookings.length}</strong> із{" "}
        <strong>{bookings.length}</strong>
      </p>

      {error && (
        <p
          className="booking-operation-error"
          role="alert"
        >
          {error}
        </p>
      )}

      {bookings.length === 0 ? (
        <div className="bookings-empty">
          <EmptyState title="Заявок ще немає">
            <Link to="/tours">
              <AppButton variant="primary">
                Обрати тур у каталозі для першої заявки
              </AppButton>
            </Link>
          </EmptyState>
        </div>
      ) : filters.visibleBookings.length === 0 ? (
        <div className="bookings-empty">
          <EmptyState title="За цими критеріями заявок не знайдено">
            <AppButton
              variant="secondary"
              onClick={filters.resetFilters}
            >
              Показати всі заявки
            </AppButton>
          </EmptyState>
        </div>
      ) : (
        <section className="bookings-section">
          <div className="bookings-section-header">
            <div>
              <h2>Мої заявки</h2>
              <p>
                Кількість заявок:{" "}
                <strong>{filters.visibleBookings.length}</strong>
              </p>
            </div>

            <Link to="/bookings/new">
              <AppButton variant="primary">
                + Нова заявка
              </AppButton>
            </Link>
          </div>

          <BookingTable
            bookings={filters.visibleBookings}
            items={items}
            onDelete={handleDelete}
          />
        </section>
      )}
    </div>
  );
}