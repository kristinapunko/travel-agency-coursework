import { Link } from "react-router";
import { FaHeart, FaCalendarAlt, FaBus } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

import AvailabilityBadge from "../AvailabilityBadge/AvailabilityBadge";
import AppButton from "../../ui/AppButton";

import "./TourCard.css";

export default function TourCard({
  tour,
  selected,
  onSelect,
}) {
  return (
    <li
      className={`tour-card ${
        tour.isAvailable ? "is-active" : "is-inactive"
      } ${selected ? "is-selected" : ""}`}
    >
      <Link
        to={`/tours/${tour.id}`}
        className="tour-card-link"
        aria-label={`Переглянути тур ${tour.name}`}
      >
        <div className="image-container">
          <img
            src={tour.imageUrl}
            alt={tour.name}
            className="tour-image"
          />

          <div
            className={`image-overlay ${
              tour.isAvailable ? "active" : "inactive"
            }`}
          />

          <div className="card-badge-top-left">
            <AvailabilityBadge available={tour.isAvailable} />
          </div>

          <div className="card-icons">
            <span className="icon-button">
              <FaHeart />
            </span>

            <span className="icon-button">
              <MdDiscount />
            </span>
          </div>
        </div>

        <div className="tour-content">
          <div className="tour-header">
            <h3 className="tour-title">
              {tour.name}
            </h3>

            <p className="tour-country">
              {tour.country}
            </p>
          </div>

          <div className="tour-rating">
            <span className="rating-score">
              ★ {tour.rating}
            </span>

            <span className="reviews-count">
              ({tour.reviews} відгуків)
            </span>
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
            <p className="people-count">
              Ціна за {tour.travelers}
            </p>

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
      </Link>

      <div className="tour-select-action">
        <AppButton
          variant={selected ? "secondary" : "primary"}
          aria-pressed={selected}
          onClick={() => onSelect(tour.id)}
        >
          {selected
            ? `Обрано «${tour.name}»`
            : "Вибрати тур"}
        </AppButton>

        {selected && (
          <p className="selection-note">
            ✓ Обрано для бронювання
          </p>
        )}
      </div>
    </li>
  );
}