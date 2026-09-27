import { Link, useNavigate, useSearchParams } from "react-router";

import EmptyState from "../../components/ui/EmptyState";
import AppButton from "../../components/ui/AppButton";
import useTourSelection from "../../hooks/useTourSelection";
import BookingPage from "../BookingPage/BookingPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import PageHeading from "../../components/ui/PageHeading";
import "./BookingCreatePage.css";

export default function BookingCreatePage({ items }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedId, clearSelection } = useTourSelection();

  const tourId = searchParams.get("tourId");

  if (tourId === null) {
    const lastSelectionSearch = selectedId
      ? `?${new URLSearchParams({ tourId: selectedId })}`
      : null;

    return (
      <>
        <PageHeading title="Нова заявка" />

        <EmptyState title="Тур не вибрано">
          <p>
            Оберіть тур із каталогу для початку оформлення заявки.
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

const tour = items.find((entry) => String(entry.id) === String(tourId));

  if (!tour) {
    return (
      <NotFoundPage
        title="Тур не знайдено"
        message={`Тур з ідентифікатором «${tourId}» відсутній у каталозі.`}
      />
    );
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
      onCancel={handleCancel}
      cancelLabel="Скасувати та перейти до каталогу"
    />
  );
}