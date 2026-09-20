import AppButton from "../../ui/AppButton";
import FormField from "../../ui/FormField";
import AvailabilityBadge from "../../tours/AvailabilityBadge/AvailabilityBadge";
import "./BookingForm.css";

export default function BookingForm({
  idPrefix,
  tourName,
  isAvailable,
  draft,
  onCustomerNameChange,
  onPhoneChange,
  onEmailChange,
  onNotesChange,
  onNeedsTransferChange,
  onReset,
}) {
  const titleId = `${idPrefix}-title`;
  const noticeId = `${idPrefix}-notice`;
  const tourId = `${idPrefix}-tour`;
  const nameId = `${idPrefix}-customer-name`;
  const phoneId = `${idPrefix}-customer-phone`;
  const emailId = `${idPrefix}-customer-email`;
  const notesId = `${idPrefix}-notes`;

  return (
    <form
      className="booking-form"
      aria-labelledby={titleId}
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
      noValidate
    >
      <h3 id={titleId} className="booking-form__title">
        Заявка на бронювання
      </h3>

      <p id={noticeId} className="booking-form__notice">
        Чернетка зберігається лише до зміни туру або перезавантаження сторінки. Наразі надсилання заблоковано.
      </p>

      <div className="tour-field-wrapper">
        <div className="tour-field-header">
          <label htmlFor={tourId} className="form-field-label">
            Обраний тур:
          </label>
          <AvailabilityBadge available={Boolean(isAvailable)} />
        </div>
        <input
          id={tourId}
          name="tourName"
          className="form-input tour-readonly-input"
          value={tourName}
          readOnly
        />
      </div>

      <FormField id={nameId} label="Ваше ім'я та прізвище">
        <input
          id={nameId}
          name="customerName"
          type="text"
          className="form-input"
          autoComplete="name"
          value={draft.customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="Тарас Шевченко"
        />
      </FormField>

      <FormField
        id={phoneId}
        label="Контактний телефон"
        hint="Формат: +380 (XX) XXX-XX-XX"
      >
        <input
          id={phoneId}
          name="customerPhone"
          type="tel"
          className="form-input"
          autoComplete="tel"
          value={draft.customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          aria-describedby={`${phoneId}-hint`}
          placeholder="+380 50 123 45 67"
        />
      </FormField>

      <FormField
        id={emailId}
        label="Електронна пошта"
        hint="Наприклад: example@gmail.com"
      >
        <input
          id={emailId}
          name="customerEmail"
          type="email"
          className="form-input"
          autoComplete="email"
          value={draft.customerEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          aria-describedby={`${emailId}-hint`}
          placeholder="your.email@example.com"
        />
      </FormField>

      <FormField
        id={notesId}
        label="Особливі побажання"
        hint="Додаткові вимоги до готелю чи харчування"
      >
        <textarea
          id={notesId}
          name="notes"
          rows={3}
          className="form-input form-textarea"
          value={draft.notes}
          onChange={(e) => onNotesChange(e.target.value)}
          aria-describedby={`${notesId}-hint`}
          placeholder="Номер з видом на море, вегетаріанське меню..."
        />
      </FormField>

      <label className="checkbox-field" style={{ margin: "14px 0" }}>
        <input
          type="checkbox"
          checked={draft.needsTransfer}
          onChange={(e) => onNeedsTransferChange(e.target.checked)}
        />
        <span>Потрібен індивідуальний трансфер з аеропорту</span>
      </label>

      <div className="form-actions">
        <AppButton type="button" variant="secondary" onClick={onReset}>
          Очистити поля чернетки
        </AppButton>

        <AppButton type="button" disabled>
          Підтвердити бронювання (буде в Л 2.2)
        </AppButton>
      </div>
    </form>
  );
}