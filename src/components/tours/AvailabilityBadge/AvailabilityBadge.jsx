import "./AvailabilityBadge.css";

export default function AvailabilityBadge({ available }) {
  const label = available ? "Місця є" : "Не активний";
  const statusClass = available ? "status-badge active" : "status-badge inactive";

  return (
    <span className={statusClass} role="status">
      {label}
    </span>
  );
}
