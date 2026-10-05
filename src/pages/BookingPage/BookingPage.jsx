import { useEffect, useRef, useState } from "react";

import PageHeading from "../../components/ui/PageHeading";
import Section from "../../components/ui/Section";
import EmptyState from "../../components/ui/EmptyState";
import AppButton from "../../components/ui/AppButton";
import BookingForm from "../../components/bookings/BookingForm/BookingForm";
import BookingSummary from "../../components/bookings/BookingSummary/BookingSummary";
import { failNextMockBooking } from "../../services/mockBookingService.js";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitting = useRef(false);
  const alive = useRef(false);

  useEffect(() => {
    alive.current = true;

    return () => {
      alive.current = false;
    };
  }, []);

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

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting.current) return;

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

    submitting.current = true;
    setIsSubmitting(true);

    try {
      const result = await onSave(validation.value);

      if (!result.ok && alive.current) {
        setOperationError(
          result.errors
            ? Object.values(result.errors).join(" ")
            : result.message || "Не вдалося зберегти заявку."
        );
      }
    } catch {
      if (alive.current) {
        setOperationError("Не вдалося завершити збереження.");
      }
    } finally {
      submitting.current = false;

      if (alive.current) {
        setIsSubmitting(false);
      }
    }
  }

  function handleReset() {
    if (isSubmitting || !isDirty) return;

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
    if (isSubmitting) return;

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
        {import.meta.env.DEV && import.meta.env.VITE_DATA_SOURCE === "mock" && (
  <div style={{ marginBottom: "1rem" }}>
    <AppButton
      type="button"
      variant="secondary"
      onClick={() => {
        failNextMockBooking("create");
        alert("Заплановано відмову для наступної операції create!");
      }}
    >
      Зімітувати відмову створення (DEV)
    </AppButton>
  </div>
)}
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
            submitLabel={
              isSubmitting ? "Збереження…" : submitLabel
            }
            isSubmitting={isSubmitting}
          />

          <BookingSummary
            tourName={tour.name}
            draft={draft}
          />

          <div className="booking-page-action">
            <AppButton
              variant="secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </AppButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
