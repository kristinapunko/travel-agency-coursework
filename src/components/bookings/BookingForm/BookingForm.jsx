import FormField from "../../ui/FormField.jsx";
import AppButton from "../../ui/AppButton.jsx";

import "./BookingForm.css";

export default function BookingForm({
  idPrefix,
  tourName,
  draft,
  errors = {},
  operationError,
  onChange,
  onBlur,
  onSubmit,
  onReset,
  submitLabel = "Зберегти заявку",
}) {
  const titleId = `${idPrefix}-title`;
  const noticeId = `${idPrefix}-notice`;

  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;
  const emailId = `${idPrefix}-email`;
  const countId = `${idPrefix}-count`;
  const transferId = `${idPrefix}-transfer`;
  const notesId = `${idPrefix}-notes`;

  function describedBy(id, error) {
    return `${id}-hint${error ? ` ${id}-error` : ""}`;
  }

  return (
    <form
      className="booking-form"
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={titleId}
      aria-describedby={noticeId}
    >
      <h3 id={titleId} className="booking-form__title">
        Заявка на бронювання
      </h3>

      <p id={noticeId} className="booking-form__notice">
        Збережіть зміни кнопкою нижче. Незбережене введення скидається при
        виході.
      </p>

      <div className="tour-field-wrapper">
        <div className="tour-field-header">
          <label className="form-field-label">
            Обраний тур:
          </label>
        </div>

        <input
          id={`${idPrefix}-tour`}
          name="tourName"
          className="form-input tour-readonly-input"
          value={tourName}
          readOnly
        />
      </div>

      {Object.keys(errors).length > 0 && (
        <p
          role="alert"
          style={{
            color: "#dc2626",
            fontWeight: "bold",
          }}
        >
          Будь ласка, виправте виділені поля.
        </p>
      )}

      {operationError && (
        <p
          role="alert"
          style={{
            color: "#dc2626",
          }}
        >
          {operationError}
        </p>
      )}

      <FormField
        id={nameId}
        label="Прізвище та ім'я (обов'язково)"
        hint="Від 3 до 60 символів."
        error={errors.customerName}
      >
        <input
          id={nameId}
          name="customerName"
          type="text"
          className="form-input"
          autoComplete="name"
          value={draft.customerName}
          onChange={(e) => onChange("customerName", e.target.value)}
          onBlur={() => onBlur("customerName")}
          aria-invalid={Boolean(errors.customerName)}
          aria-describedby={describedBy(nameId, errors.customerName)}
          placeholder="Тарас Шевченко"
        />
      </FormField>

      <FormField
        id={phoneId}
        label="Номер телефону (обов'язково)"
        hint="Формат: +380XXXXXXXXX"
        error={errors.customerPhone}
      >
        <input
          id={phoneId}
          name="customerPhone"
          type="tel"
          className="form-input"
          autoComplete="tel"
          value={draft.customerPhone}
          onChange={(e) => onChange("customerPhone", e.target.value)}
          onBlur={() => onBlur("customerPhone")}
          aria-invalid={Boolean(errors.customerPhone)}
          aria-describedby={describedBy(phoneId, errors.customerPhone)}
          placeholder="+380 50 123 45 67"
        />
      </FormField>

      <FormField
        id={emailId}
        label="Електронна пошта (обов'язково)"
        hint="name@example.com"
        error={errors.customerEmail}
      >
        <input
          id={emailId}
          name="customerEmail"
          type="email"
          className="form-input"
          autoComplete="email"
          value={draft.customerEmail}
          onChange={(e) => onChange("customerEmail", e.target.value)}
          onBlur={() => onBlur("customerEmail")}
          aria-invalid={Boolean(errors.customerEmail)}
          aria-describedby={describedBy(emailId, errors.customerEmail)}
          placeholder="your.email@example.com"
        />
      </FormField>

      <FormField
        id={countId}
        label="Кількість осіб (обов'язково)"
        hint="Ціле число від 1 до 10."
        error={errors.travelersCount}
      >
        <input
          id={countId}
          name="travelersCount"
          type="number"
          min={1}
          max={10}
          step={1}
          className="form-input"
          value={draft.travelersCount}
          onChange={(e) => onChange("travelersCount", e.target.value)}
          onBlur={() => onBlur("travelersCount")}
          aria-invalid={Boolean(errors.travelersCount)}
          aria-describedby={describedBy(countId, errors.travelersCount)}
        />
      </FormField>

      <div
        className="checkbox-field"
        style={{ margin: "14px 0" }}
      >
        <label
          htmlFor={transferId}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            id={transferId}
            name="needsTransfer"
            type="checkbox"
            checked={Boolean(draft.needsTransfer)}
            onChange={(e) => onChange("needsTransfer", e.target.checked)}
            onBlur={() => onBlur("needsTransfer")}
            aria-invalid={Boolean(errors.needsTransfer)}
            aria-describedby={describedBy(
              transferId,
              errors.needsTransfer
            )}
          />

          <span>
            Потрібен груповий або індивідуальний трансфер
          </span>
        </label>

        <p
          id={`${transferId}-hint`}
          className="field-hint"
        >
          Для груп понад 4 особи трансфер є обов'язковим.
        </p>

        {errors.needsTransfer && (
          <p
            id={`${transferId}-error`}
            className="field-error"
            style={{ color: "#dc2626" }}
          >
            {errors.needsTransfer}
          </p>
        )}
      </div>

      <FormField
        id={notesId}
        label="Додаткові побажання"
        hint="Не більше 300 символів."
        error={errors.notes}
      >
        <textarea
          id={notesId}
          name="notes"
          rows={3}
          className="form-input form-textarea"
          value={draft.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          onBlur={() => onBlur("notes")}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={describedBy(notesId, errors.notes)}
          placeholder="Номер з видом на море, вегетаріанське меню..."
        />
      </FormField>

      <div className="form-actions">
        <AppButton
          type="submit"
          variant="primary"
        >
          {submitLabel}
        </AppButton>

        <AppButton
          type="button"
          variant="secondary"
          onClick={onReset}
        >
          Відновити поля
        </AppButton>
      </div>
    </form>
  );
}