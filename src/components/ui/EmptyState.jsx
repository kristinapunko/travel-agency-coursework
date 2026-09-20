import "./ui.css";

export default function EmptyState({ title, children }) {
  return (
    <div className="empty-state" role="status">
      <p>
        <strong>{title}</strong>
      </p>
      {children}
    </div>
  );
}
