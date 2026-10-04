import { Link } from "react-router";
import AppButton from "../../ui/AppButton";

export default function BookingTable({ bookings, items, onDelete }) {
  return (
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
              (item) => String(item.id) === String(booking.tourId)
            );

            return (
              <tr key={booking.id}>
                <td>
                  <Link to={`/bookings/${encodeURIComponent(booking.id)}`}>
                    <strong>{booking.id}</strong>
                  </Link>
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
                  <Link
                    to={`/bookings/${encodeURIComponent(booking.id)}/edit`}
                  >
                    <AppButton variant="secondary">
                      Редагувати
                    </AppButton>
                  </Link>

                  <AppButton
                    variant="secondary"
                    onClick={() => onDelete?.(booking)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Видалити
                  </AppButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
