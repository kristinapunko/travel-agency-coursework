import "./BookingSummary.css";

export default function BookingSummary({ tourName, draft }) {
  return (
    <aside className="booking-summary" aria-labelledby="booking-summary-title">
      <h3 id="booking-summary-title" className="booking-summary__title">
        Попередній перегляд чернетки
      </h3>

      <dl className="summary-list">
        <div className="summary-item">
          <dt>Обраний тур:</dt>
          <dd>{tourName}</dd>
        </div>

        <div className="summary-item">
          <dt>Клієнт:</dt>
          <dd>{draft.customerName.trim() || "Ще не вказано"}</dd>
        </div>

        <div className="summary-item">
          <dt>Телефон:</dt>
          <dd>{draft.customerPhone.trim() || "Не вказано"}</dd>
        </div>

        <div className="summary-item">
          <dt>Email:</dt>
          <dd>{draft.customerEmail.trim() || "Не вказано"}</dd>
        </div>

        <div className="summary-item">
          <dt>Побажання:</dt>
          <dd>{draft.notes.trim() || "Без особливих побажань"}</dd>
        </div>

        <div className="summary-item">
          <dt>Трансфер:</dt>
          <dd>{draft.needsTransfer ? "✓ Потрібен" : "Ні"}</dd>
        </div>
      </dl>

      <p className="summary-note">
        * Цей підсумок генерується на основі введених даних і не підтверджує оплату.
      </p>
    </aside>
  );
}