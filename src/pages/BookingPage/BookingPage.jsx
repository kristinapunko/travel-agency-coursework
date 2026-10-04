import { useState } from "react";

import PageHeading from "../../components/ui/PageHeading";
import Section from "../../components/ui/Section";
import EmptyState from "../../components/ui/EmptyState";
import AppButton from "../../components/ui/AppButton";
import BookingForm from "../../components/bookings/BookingForm/BookingForm";
import BookingSummary from "../../components/bookings/BookingSummary/BookingSummary";

import { validateBooking } from "../../domain/bookingValidation.js";

import "./BookingPage.css";

const defaultEmptyDraft = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  travelersCount: "1",
  needsTransfer: false,
  notes: "",
};

export default function BookingPage({
  title = "Оформлення заявки",
  tour,
  initialDraft = defaultEmptyDraft,
  onSave,
  onCancel,
  submitLabel = "Зберегти заявку",
  cancelLabel = "Вийти без збереження",
}) {
  const initialValues = {
    customerName: initialDraft.customerName ?? "",
    customerPhone: initialDraft.customerPhone ?? "",
    customerEmail: initialDraft.customerEmail ?? "",
    travelersCount: String(initialDraft.travelersCount ?? "1"),
    needsTransfer: Boolean(initialDraft.needsTransfer),
    notes: initialDraft.notes ?? "",
  };

  const [draft, setDraft] = useState(() => ({
    ...initialValues,
  }));

  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [operationError, setOperationError] = useState("");

  if (!tour) {
    return (
      <Section id="booking" title="Заявка на бронювання">
        <EmptyState title="Тур ще не обрано">
          <p>
            Будь ласка, перейдіть до{" "}
            <a href="#catalog">каталогу турів</a> та оберіть тур
            для оформлення заявки.
          </p>
        </EmptyState>
      </Section>
    );
  }

  const validation = validateBooking(
    { ...draft, tourId: tour.id },
    [tour]
  );

  const errors = Object.fromEntries(
    Object.entries(validation.errors).filter(
      ([field]) => attempted || touched[field]
    )
  );

  const isDirty =
    draft.customerName !== initialValues.customerName ||
    draft.customerPhone !== initialValues.customerPhone ||
    draft.customerEmail !== initialValues.customerEmail ||
    draft.travelersCount !== initialValues.travelersCount ||
    draft.needsTransfer !== initialValues.needsTransfer ||
    draft.notes !== initialValues.notes;

  function handleChange(field, value) {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));

    setOperationError("");
  }

  function handleBlur(field) {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setAttempted(true);
    setOperationError("");

    if (!validation.ok) {
      const firstField = [
        "customerName",
        "customerPhone",
        "customerEmail",
        "travelersCount",
        "needsTransfer",
        "notes",
      ].find((field) => validation.errors[field]);

      if (firstField) {
        event.currentTarget.elements
          .namedItem(firstField)
          ?.focus();
      }

      return;
    }

    const result = onSave(validation.value);

    if (!result.ok) {
      setOperationError(
        result.message ||
          Object.values(result.errors || {}).join(" ")
      );
    }
  }

  function handleReset() {
    if (!isDirty) return;

    if (
      !window.confirm(
        "Відкинути всі введені зміни та повернути початкові значення?"
      )
    ) {
      return;
    }

    setDraft({
      ...initialValues,
    });

    setTouched({});
    setAttempted(false);
    setOperationError("");
  }

  function handleCancel() {
    if (
      isDirty &&
      !window.confirm(
        "Вийти та відкинути незбережені зміни?"
      )
    ) {
      return;
    }

    onCancel();
  }

  return (
    <div className="booking-editor container">
      <PageHeading title={`${title}: ${tour.name}`} />

      <Section
        id="booking"
        title="Параметри заявки та підсумок"
      >
        <div className="booking-page-content">
          <BookingForm
            idPrefix="booking-draft"
            tourName={tour.name}
            draft={draft}
            errors={errors}
            operationError={operationError}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            onReset={handleReset}
            submitLabel={submitLabel}
          />

          <BookingSummary
            tourName={tour.name}
            draft={draft}
          />

          <div className="booking-page-action">
            <AppButton
              variant="secondary"
              onClick={handleCancel}
            >
              {cancelLabel}
            </AppButton>
          </div>
        </div>
      </Section>
    </div>
  );
}