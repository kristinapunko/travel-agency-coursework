import { useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

import PageHeading from "../../components/ui/PageHeading";
import EmptyState from "../../components/ui/EmptyState";
import AppButton from "../../components/ui/AppButton";

import useTourSelection from "../../hooks/useTourSelection";
import useBookings from "../../hooks/useBookings";

import BookingPage from "../BookingPage/BookingPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import "./BookingCreatePage.css";

export default function BookingCreatePage({ items = [] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { selectedId, clearSelection } = useTourSelection();
  const { createBooking } = useBookings();

  const pageAlive = useRef(false);

  useEffect(() => {
    pageAlive.current = true;

    return () => {
      pageAlive.current = false;
    };
  }, []);

  const tourId = searchParams.get("tourId");

  if (tourId === null) {
    const lastSelectionSearch = selectedId
      ? `?${new URLSearchParams({ tourId: selectedId })}`
      : null;

    return (
      <>
        <PageHeading title="Нова заявка на тур" />

        <EmptyState title="Спочатку оберіть тур із каталогу">
          <p>
            Для формування заявки необхідно обрати напрямок подорожі.
          </p>

          <div className="booking-create-actions">
            <Link to="/tours">
              <AppButton variant="primary">
                Відкрити каталог турів
              </AppButton>
            </Link>

            {lastSelectionSearch && (
              <Link to={`/bookings/new${lastSelectionSearch}`}>
                <AppButton variant="secondary">
                  Використати останній вибір
                </AppButton>
              </Link>
            )}
          </div>
        </EmptyState>
      </>
    );
  }

  const tour = items.find(
    (entry) => String(entry.id) === String(tourId)
  );

  if (!tour) {
    return (
      <NotFoundPage
        title="Тур не знайдено"
        message={`Тур з ідентифікатором «${tourId}» відсутній у поточному каталозі.`}
      />
    );
  }

  async function handleSave(input) {
    const result = await createBooking(input);

    if (result.ok && pageAlive.current) {
      navigate(
        `/bookings/${encodeURIComponent(result.record.id)}`,
        { replace: true }
      );
    }

    return result;
  }

  function handleCancel() {
    clearSelection();
    navigate("/tours", { replace: true });
  }

  return (
    <BookingPage
      key={`new-${tour.id}`}
      title="Нова заявка"
      tour={tour}
      onSave={handleSave}
      submitLabel="Створити заявку"
      onCancel={handleCancel}
      cancelLabel="Скасувати та перейти до каталогу"
    />
  );
}
