import Section from "../../components/ui/Section";
import EmptyState from "../../components/ui/EmptyState";
import BookingFormPreview from "../../components/bookings/BookingFormPreview";
import './BookingPage.css';

export default function BookingPage({ selectedTour }) {
  return (
    <Section id="booking" title="Швидке бронювання">
      {selectedTour ? (
        <div className="booking-page-content">
          <BookingFormPreview
            idPrefix="booking-preview"
            tourName={selectedTour.name}
            available={selectedTour.isAvailable}
          />
        </div>
      ) : (
        <EmptyState title="Тур для бронювання не вибрано">
          <p>
            Будь ласка, перейдіть до <a href="#catalog">каталогу турів</a> та оберіть бажану подорож.
          </p>
        </EmptyState>
      )}
    </Section>
  );
}