import FormField from "../ui/FormField";
import AppButton from "../ui/AppButton";
import AvailabilityBadge from "../tours/AvailabilityBadge/AvailabilityBadge";
import "./BookingFormPreview.css";

export default function BookingFormPreview({ idPrefix, tourName, available }) {
  const titleId = `${idPrefix}-title`;
  const noticeId = `${idPrefix}-notice`;
  const tourId = `${idPrefix}-tour`;
  const nameId = `${idPrefix}-customer-name`;
  const phoneId = `${idPrefix}-customer-phone`;
  const emailId = `${idPrefix}-customer-email`;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form
      className="booking-form-preview"
      aria-labelledby={titleId}
      aria-describedby={noticeId}
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 id={titleId} className="booking-form-preview__title">
        Заявка на бронювання
      </h3>

      <div className="tour-field-wrapper">
        <div className="tour-field-header">
          <label htmlFor={tourId} className="form-field-label">
            Обраний тур
          </label>
          <AvailabilityBadge available={Boolean(available)} />
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
          defaultValue=""
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
          aria-describedby={`${phoneId}-hint`}
          defaultValue=""
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
          aria-describedby={`${emailId}-hint`}
          defaultValue=""
        />
      </FormField>

      <div className="form-actions">
        <AppButton type="reset" variant="secondary">
          Очистити поля
        </AppButton>

        <AppButton type="submit" disabled>
          Підтвердити бронювання
        </AppButton>
      </div>
    </form>
  );
}