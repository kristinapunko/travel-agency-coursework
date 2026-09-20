import { useEffect, useState } from "react";
import Section from "../../components/ui/Section";
import EmptyState from "../../components/ui/EmptyState";
import AppButton from "../../components/ui/AppButton";
import BookingSummary from "../../components/bookings/BookingSummary/BookingSummary";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
import "./BookingPage.css";
import BookingForm from "../../components/bookings/BookingForm/BookingForm";

function createEmptyDraft() {
  return {
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    notes: "",
    needsTransfer: false,
  };
}

export default function BookingPage({ selectedTour, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft);

  const title = selectedTour
    ? `Бронювання: ${selectedTour.name} | Travel Agency`
    : "Travel Agency — Тури та відпочинок";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  const handleCustomerNameChange = (customerName) => {
    setDraft((prev) => ({ ...prev, customerName }));
  };

  const handlePhoneChange = (customerPhone) => {
    setDraft((prev) => ({ ...prev, customerPhone }));
  };

  const handleEmailChange = (customerEmail) => {
    setDraft((prev) => ({ ...prev, customerEmail }));
  };

  const handleNotesChange = (notes) => {
    setDraft((prev) => ({ ...prev, notes }));
  };

  const handleNeedsTransferChange = (needsTransfer) => {
    setDraft((prev) => ({ ...prev, needsTransfer }));
  };

  const handleReset = () => {
    setDraft(createEmptyDraft());
  };

  if (!selectedTour) {
    return (
      <Section id="booking" title="Заявка на бронювання">
        <EmptyState title="Тур ще не обрано">
          <p>
            Будь ласка, перейдіть до <a href="#catalog">каталогу турів</a> та оберіть тур для оформлення заявки.
          </p>
        </EmptyState>
      </Section>
    );
  }

  return (
    <Section id="booking" title="Заявка на бронювання">
      <div className="booking-page-content">
        <BookingForm
          idPrefix="booking-draft"
          tourName={selectedTour.name}
          isAvailable={selectedTour.isAvailable}
          draft={draft}
          onCustomerNameChange={handleCustomerNameChange}
          onPhoneChange={handlePhoneChange}
          onEmailChange={handleEmailChange}
          onNotesChange={handleNotesChange}
          onNeedsTransferChange={handleNeedsTransferChange}
          onReset={handleReset}
        />

        <BookingSummary tourName={selectedTour.name} draft={draft} />

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <AppButton variant="secondary" onClick={onClearSelection}>
            Скасувати вибір туру та скинути чернетку
          </AppButton>
        </div>
      </div>
    </Section>
  );
}