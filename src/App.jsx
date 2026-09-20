import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import BookingPage from "./pages/BookingPage/BookingPage";
import { tours } from "./data/tours";
import "./App.css";

const navigationLinks = [
  { href: "#about", label: "Про нас" },
  { href: "#catalog", label: "Каталог турів" },
  { href: "#booking", label: "Бронювання" },
];

export default function App() {
  const appTitle = import.meta.env.VITE_APP_TITLE || "Travel Agency";
  
  const demoTour = tours.length > 0 ? tours[0] : null;

  return (
    <AppLayout title={appTitle} links={navigationLinks}>
      <HomePage />
      <BookingPage selectedTour={demoTour} />
    </AppLayout>
  );
}