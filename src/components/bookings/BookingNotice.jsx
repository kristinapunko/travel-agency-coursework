import useBookings from "../../hooks/useBookings.js";
import AppButton from "../ui/AppButton.jsx";

export default function BookingNotice() {
  const { notice, dismissNotice } = useBookings();

  if (!notice) return null;

  return (
    <div
      className="operation-notice"
      style={{
        margin: "1rem 0",
        padding: "0.75rem 1rem",
        backgroundColor: "#e0f2fe",
        borderLeft: "4px solid #0284c7",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p
        role="status"
        style={{
          margin: 0,
          color: "#0369a1",
          fontWeight: 500,
        }}
      >
        {notice}
      </p>

      <AppButton
        variant="secondary"
        onClick={dismissNotice}
      >
        ✕ Закрити
      </AppButton>
    </div>
  );
}