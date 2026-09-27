import { useNavigate } from "react-router";
import { FaHome, FaSadCry } from "react-icons/fa";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <FaSadCry />
        </div>

        <h1 className="not-found-code">404</h1>

        <h2 className="not-found-title">
          Сторінку не знайдено
        </h2>

        <p className="not-found-text">
          Схоже, що подорож, яку ви шукаєте, не існує або була
          переміщена. Спробуйте повернутись на головну сторінку
          та почати знову.
        </p>

        <button
          onClick={() => navigate("/")}
          className="not-found-button"
        >
          <FaHome />
          На головну сторінку
        </button>
      </div>
    </div>
  );
}