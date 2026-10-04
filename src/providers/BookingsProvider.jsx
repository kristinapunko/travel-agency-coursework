import { useState } from "react";
import { BookingsContext } from "../context/BookingsContext.js";
import { bookings as initialBookings } from "../data/bookings.js";
import { validateBooking } from "../domain/bookingValidation.js";

export default function BookingsProvider({ items, children }) {
  const [bookings, setBookings] = useState(() =>
    initialBookings.map((b) => ({ ...b }))
  );
  const [notice, setNotice] = useState("");

  function createBooking(input) {
    const validation = validateBooking(input, items);
    if (!validation.ok) return validation;

    const record = {
      id: `book-${crypto.randomUUID().slice(0, 8)}`,
      ...validation.value,
    };

    setBookings((prev) => [...prev, record]);
    setNotice("Заявку на тур успішно створено в локальній колекції.");
    return { ok: true, record };
  }

  function updateBooking(id, input) {
    const current = bookings.find((b) => String(b.id) === String(id));

    if (!current) {
      return { ok: false, message: "Заявку для оновлення не знайдено." };
    }

    const validation = validateBooking(input, items);
    if (!validation.ok) return validation;

    const record = { ...validation.value, id: current.id };

    setBookings((prev) =>
      prev.map((b) => (String(b.id) === String(id) ? record : b))
    );

    setNotice("Зміни до заявки успішно збережено.");
    return { ok: true, record };
  }

  function deleteBooking(id) {
    if (!bookings.some((b) => String(b.id) === String(id))) {
      return { ok: false, message: "Заявку для видалення не знайдено." };
    }

    setBookings((prev) =>
      prev.filter((b) => String(b.id) !== String(id))
    );

    setNotice("Заявку вилучено з локальної колекції.");
    return { ok: true };
  }

  function dismissNotice() {
    setNotice("");
  }

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        createBooking,
        updateBooking,
        deleteBooking,
        notice,
        dismissNotice,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
}