import AppLayout from "./components/layout/AppLayout";
import TourSelectionProvider from "./providers/TourSelectionProvider";
import CatalogContainer from "./pages/CatalogContainer";
import BookingContainer from "./pages/BookingContainer";
import { tours } from "./data/tours";
import "./App.css";

const navigationLinks = [
  { href: "#about", label: "Про нас" },
  { href: "#catalog", label: "Каталог турів" },
  { href: "#booking", label: "Заявка на бронювання" },
];

export default function App() {
  return (
    <AppLayout title="Travel Agency" links={navigationLinks}>
      <TourSelectionProvider items={tours}>
        <CatalogContainer items={tours} />
        <BookingContainer />
      </TourSelectionProvider>
    </AppLayout>
  );
}