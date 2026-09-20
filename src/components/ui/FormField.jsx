import "./ui.css";

export default function FormField({ id, label, hint, children }) {
  const hintId = `${id}-hint`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint ? (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
