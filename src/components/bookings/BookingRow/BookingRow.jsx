import { memo } from 'react';
import { Link } from 'react-router';
import AppButton from '../ui/AppButton.jsx';
import './BookingRow.css';

function BookingRow({ booking, tourName, onDelete, isMutating }) {
  return (
    <tr className="booking-row">
      <td className="booking-id">{booking.id}</td>

      <td className="booking-tour">
        <strong>{tourName}</strong>
      </td>

      <td>{booking.customerName}</td>
      <td>{booking.customerPhone}</td>
      <td className="booking-count">{booking.travelersCount}</td>

      <td>
        <span
          className={`booking-transfer ${
            booking.needsTransfer ? 'transfer-yes' : 'transfer-no'
          }`}
        >
          {booking.needsTransfer ? 'Так' : 'Ні'}
        </span>
      </td>

      <td>
        <div className="booking-actions">
          <Link
            className="booking-link"
            to={`/bookings/${encodeURIComponent(booking.id)}`}
          >
            Деталі
          </Link>

          <Link
            className="booking-link booking-link-edit"
            to={`/bookings/${encodeURIComponent(booking.id)}/edit`}
          >
            Редагувати
          </Link>

          <AppButton
            variant="secondary"
            disabled={isMutating}
            onClick={() => onDelete(booking)}
          >
            Видалити
          </AppButton>
        </div>
      </td>
    </tr>
  );
}

export default memo(BookingRow);