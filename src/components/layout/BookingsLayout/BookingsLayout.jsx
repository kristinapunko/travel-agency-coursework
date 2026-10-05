import { NavLink, Outlet } from "react-router";

import "./BookingsLayout.css";
import BookingNotice from "../../bookings/BookingNotice";
import BookingsGate from "../../bookings/BookingsGate/BookingsGate";

export default function BookingsLayout() {
  return (
    <div className="container bookings-layout">
      <div className="bookings-header">
        <div>
          <h1>Заявки</h1>
          <p>Керуйте вашими заявками та створюйте нові</p>
        </div>

        <nav className="bookings-nav">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Список заявок
          </NavLink>

          <NavLink
            to="new"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="plus">+</span>
            Нова заявка
          </NavLink>
        </nav>
      </div>

      <main className="bookings-content">
        <BookingNotice />
        <BookingsGate>
          <Outlet />
        </BookingsGate>
      </main>
    </div>
  );
}