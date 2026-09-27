import { Link } from "react-router";
import PageHeading from "../../components/ui/PageHeading";
import EmptyState from "../../components/ui/EmptyState";
import AppButton from "../../components/ui/AppButton";

import "./BookingsPage.css";

export default function BookingsPage({ bookings, items }) {
  return (
    <div className="bookings-page">
      <PageHeading title="Список заявок" />

      <p className="bookings-page-description">
        Нижче наведено локальні демонстраційні записи ваших заявок.
      </p>

      {bookings.length === 0 ? (
        <div className="bookings-empty">
          <EmptyState title="Немає збережених заявок">
            <Link to="new">
              <AppButton variant="primary">
                Підготувати нову заявку
              </AppButton>
            </Link>
          </EmptyState>
        </div>
      ) : (
        <section className="bookings-section">
          <div className="bookings-section-header">
            <div>
              <h2>Мої заявки</h2>
              <p>
                Кількість заявок:{" "}
                <strong>{bookings.length}</strong>
              </p>
            </div>

            <Link to="new">
              <AppButton variant="primary">
                + Нова заявка
              </AppButton>
            </Link>
          </div>

          <div className="table-scroll">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Тур</th>
                  <th>Клієнт</th>
                  <th>Трансфер</th>
                  <th>Дія</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => {
                  const tour = items.find(
                    (item) => item.id === booking.tourId
                  );

                  return (
                    <tr key={booking.id}>
                      <td>
                        <strong>{booking.id}</strong>
                      </td>

                      <td>
                        <div className="booking-tour">
                          <span className="booking-tour-name">
                            {tour?.name ?? "Тур видалено"}
                          </span>

                          {tour && (
                            <span className="booking-tour-country">
                              {tour.country}
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="booking-customer">
                          <strong>{booking.customerName}</strong>
                          <span>{booking.customerPhone}</span>
                          <span>{booking.customerEmail}</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            booking.needsTransfer
                              ? "transfer-badge transfer-yes"
                              : "transfer-badge transfer-no"
                          }
                        >
                          {booking.needsTransfer ? "Так" : "Ні"}
                        </span>
                      </td>

                      <td>
                        <Link to={`${booking.id}/edit`}>
                          <AppButton variant="secondary">
                            Редагувати
                          </AppButton>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}