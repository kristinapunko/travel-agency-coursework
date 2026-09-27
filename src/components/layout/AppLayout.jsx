import { Outlet } from "react-router";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import TourSelectionProvider from "../../providers/TourSelectionProvider";
import "./AppLayout.css";

const navigationLinks = [
  { to: "/", label: "Головна", end: true },
  { to: "/tours", label: "Каталог турів" },
  { to: "/bookings", label: "Мої заявки" },
];

export default function AppLayout({ title, items }) {
  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link">
        Перейти до вмісту
      </a>

      <Header  title={title} links={navigationLinks} />

      <main id="main-content" className="site-main">
        <TourSelectionProvider items={items}>
          <Outlet />
        </TourSelectionProvider>
      </main>

      <Footer appTitle={title} />
    </div>
  );
}