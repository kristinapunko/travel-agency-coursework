import { Routes, Route } from "react-router";

import AppLayout from "./components/layout/AppLayout";
import BookingsLayout from "./components/layout/BookingsLayout/BookingsLayout";

import HomePage from "./pages/HomePage/HomePage";
import CatalogContainer from "./pages/CatalogContainer";
import TourDetailsPage from "./pages/TourDetailsPage/TourDetailsPage";

import BookingsPage from "./pages/BookingsPage/BookingsPage";
import BookingCreatePage from "./pages/BookingCreatePage/BookingCreatePage";
import BookingDetailsPage from "./pages/BookingDetailsPage/BookingDetailsPage";
import BookingEditPage from "./pages/BookingEditPage/BookingEditPage";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import { tours } from "./data/tours";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout items={tours} />}>
        <Route index element={<HomePage />} />

        <Route path="tours">
          <Route
            index
            element={<CatalogContainer items={tours} />}
          />

          <Route
            path=":tourId"
            element={<TourDetailsPage items={tours} />}
          />
        </Route>

        <Route
          path="bookings"
          element={<BookingsLayout />}
        >
          <Route
            index
            element={<BookingsPage items={tours} />}
          />

          <Route
            path="new"
            element={<BookingCreatePage items={tours} />}
          />

          <Route
            path=":bookingId"
            element={<BookingDetailsPage items={tours} />}
          />

          <Route
            path=":bookingId/edit"
            element={<BookingEditPage items={tours} />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}