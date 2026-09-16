import "./TourCard.css";
import { FaHeart, FaCalendarAlt, FaBus } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

export default function TourCard({ tour }) {
  const statusText = tour.isAvailable ? "Місця є" : "Не активний";

  return (
    <li
      className={`tour-card ${tour.isAvailable ? "is-active" : "is-inactive"}`}
    >
      <div className="image-container">
        <img src={tour.imageUrl} alt={tour.name} className="tour-image" />

        <div
          className={`image-overlay ${
            tour.isAvailable ? "active" : "inactive"
          }`}
        />

        {!tour.isAvailable && (
          <span className="inactive-badge">{statusText}</span>
        )}

        <div className="card-icons">
          <button className="icon-button" aria-label="Додати до обраного">
            <FaHeart />
          </button>

          <button className="icon-button" aria-label="Акція">
            <MdDiscount />
          </button>
        </div>
      </div>

      <div className="tour-content">
        {/* Назва та країна */}
        <div className="tour-header">
          <h3 className="tour-title">{tour.name}</h3>

          <p className="tour-country">{tour.country}</p>
        </div>

        <div className="tour-rating">
          <span className="rating-score">★ {tour.rating}</span>

          <span className="reviews-count">({tour.reviews} відгуків)</span>
        </div>

        <div className="tour-details-list">
          <p className="detail-item">
            <span className="detail-icon">
              <FaCalendarAlt />
            </span>
            <span>{tour.date}</span>
          </p>

          <p className="detail-item">
            <span className="detail-icon">
              <FaBus />
            </span>
            <span>{tour.transport}</span>
          </p>

          <p className="detail-item">
            <span className="detail-icon">
              <BiSolidDish />
            </span>
            <span>{tour.food}</span>
          </p>
        </div>

        <div className="tour-pricing">
          <p className="people-count">Ціна за {tour.travelers}</p>

          <div className="price-row">
            {tour.oldPrice && (
              <span className="old-price">
                {tour.oldPrice.toLocaleString("uk-UA")} грн
              </span>
            )}

            <span className="price">
              {tour.price.toLocaleString("uk-UA")} грн
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
