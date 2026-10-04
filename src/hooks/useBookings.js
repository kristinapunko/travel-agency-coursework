import { useContext } from "react";
import { BookingsContext } from "../context/BookingsContext.js";

export default function useBookings() {
  const context = useContext(BookingsContext);
  if (context === null) {
    throw new Error("useBookings must be used within BookingsProvider");
  }
  return context;
}