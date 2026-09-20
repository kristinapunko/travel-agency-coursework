import { useState } from "react";
import { FaHeart, FaCalendarAlt, FaBus } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import AvailabilityBadge from "../AvailabilityBadge/AvailabilityBadge";
import AppButton from "../../ui/AppButton";
import "./TourCard.css";

export default function TourCard({ tour, selected, onSelect }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const descriptionId = `tour-${tour.id}-description`;

  return (
    <li className={`tour-card ${tour.isAvailable ? "is-active" : "is-inactive"} ${selected ? "is-selected" : ""}`}>
      <div className="image-container">
        <img src={tour.imageUrl} alt={tour.name} className="tour-image" />
        <div className={`image-overlay ${tour.isAvailable ? "active" : "inactive"}`} />

        <div className="card-badge-top-left">
          <AvailabilityBadge available={tour.isAvailable} />
        </div>

        <div className="card-icons">
          <button className="icon-button" type="button" aria-label="Додати до обраного">
            <FaHeart />
          </button>
          <button className="icon-button" type="button" aria-label="Акція">
            <MdDiscount />
          </button>
        </div>
      </div>

      <div className="tour-content">
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
            <span className="detail-icon"><FaCalendarAlt /></span>
            <span>{tour.date}</span>
          </p>
          <p className="detail-item">
            <span className="detail-icon"><FaBus /></span>
            <span>{tour.transport}</span>
          </p>
          <p className="detail-item">
            <span className="detail-icon"><BiSolidDish /></span>
            <span>{tour.food}</span>
          </p>
        </div>

        <div className="tour-expandable-details">
          <AppButton
            variant="secondary"
            aria-expanded={detailsOpen}
            aria-controls={descriptionId}
            onClick={() => setDetailsOpen((prev) => !prev)}
          >
            {detailsOpen ? "Згорнути опис" : "Детальніше про тур"}
          </AppButton>
          {detailsOpen && (
            <p id={descriptionId} className="tour-description-text">
              {tour.description || `Чудова подорож за маршрутом: ${tour.name}. Включено екскурсійну програму та трансфер.`}
            </p>
          )}
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

        <div className="tour-select-action">
          <AppButton
            variant={selected ? "secondary" : "primary"}
            aria-pressed={selected}
            onClick={() => onSelect(tour.id)}
          >
            {selected ? `Обрано «${tour.name}»` : `Вибрати тур`}
          </AppButton>
          {selected && <p className="selection-note">✓ Обрано для бронювання</p>}
        </div>
      </div>
    </li>
  );
}