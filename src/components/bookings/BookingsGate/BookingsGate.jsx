import useBookings from '../../../hooks/useBookings.js';
import AppButton from '../../ui/AppButton.jsx';
import EmptyState from '../../ui/EmptyState.jsx';

import './BookingsGate.css';

export default function BookingsGate({ children }) {
  const { status, error, reload } = useBookings();

  if (status === 'loading') {
    return (
      <div className="bookings-gate">
        <div className="bookings-gate-card">
          <div className="bookings-gate-loader">
            <span className="bookings-gate-spinner" />
            <p className="bookings-gate-loading-text">
              Завантаження заявок…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bookings-gate">
        <div className="bookings-gate-card bookings-gate-card--error">
          <EmptyState title="Помилка завантаження даних">
            <div className="bookings-gate-error">
              <p role="alert" className="bookings-gate-error-message">
                {error}
              </p>

              <AppButton
                variant="primary"
                onClick={() => void reload()}
              >
                Спробувати ще раз
              </AppButton>
            </div>
          </EmptyState>
        </div>
      </div>
    );
  }

  return children;
}
