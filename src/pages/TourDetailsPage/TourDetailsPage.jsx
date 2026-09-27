import { useParams, useNavigate } from "react-router";
import {
  FaCalendarAlt,
  FaBus,
  FaUtensils,
  FaUsers,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaClipboardCheck,
  FaGlobe
} from "react-icons/fa";
import { MdAirplanemodeActive } from "react-icons/md";
import PageHeading from "../../components/ui/PageHeading";
import AppButton from "../../components/ui/AppButton";
import AvailabilityBadge from "../../components/tours/AvailabilityBadge/AvailabilityBadge";
import useTourSelection from "../../hooks/useTourSelection";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import "./TourDetailsPage.css";

export default function TourDetailsPage({ items }) {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { selectTour } = useTourSelection();

  const tour = items.find((entry) => entry.id === tourId);

  if (!tour) {
    return (
      <NotFoundPage
        title="Тур не знайдено"
        message={`Тур з кодом «${tourId}» відсутній у каталозі.`}
      />
    );
  }

  function handlePrepareBooking() {
    selectTour(tour.id);

    const search = new URLSearchParams({
      tourId: tour.id,
    });

    navigate(`/bookings/new?${search}`);
  }

  return (
    <div className="tour-details-page">
      <div className="container">
        <PageHeading title={tour.name} />

        <div className="tour-details-layout">
          <div className="tour-details-gallery">
            <img
              src={tour.imageUrl}
              alt={tour.name}
              className="tour-details-image"
            />
          </div>

          <div className="tour-details-card">
            <div className="tour-details-card-header">
              <AvailabilityBadge
                available={tour.isAvailable}
              />

              <span className="tour-details-country-label">
                <FaMapMarkerAlt />
                {tour.country}
              </span>
            </div>

            <h2 className="tour-details-title">
              Інформація про тур
            </h2>

            <div className="tour-details-info">
              <div className="tour-details-info-item">
                <span className="tour-details-info-icon">
                  <FaCalendarAlt />
                </span>

                <div>
                  <strong>Дати туру</strong>
                  <span>{tour.date}</span>
                </div>
              </div>

              <div className="tour-details-info-item">
                <span className="tour-details-info-icon">
                  <FaBus />
                </span>

                <div>
                  <strong>Транспорт</strong>
                  <span>{tour.transport}</span>
                </div>
              </div>

              <div className="tour-details-info-item">
                <span className="tour-details-info-icon">
                  <FaUtensils />
                </span>

                <div>
                  <strong>Харчування</strong>
                  <span>{tour.food}</span>
                </div>
              </div>

              <div className="tour-details-info-item">
                <span className="tour-details-info-icon">
                  <FaUsers />
                </span>

                <div>
                  <strong>Кількість туристів</strong>
                  <span>{tour.travelers}</span>
                </div>
              </div>
            </div>

            <div className="tour-details-price-block">
              <span className="tour-details-price-label">
                Вартість туру
              </span>

              <p className="tour-details-price">
                {tour.price?.toLocaleString("uk-UA")} грн
              </p>
            </div>

            <div className="tour-details-actions">
              <AppButton
                variant="primary"
                onClick={handlePrepareBooking}
              >
                <FaClipboardCheck />
                Вибрати й підготувати заявку
              </AppButton>

              <AppButton variant="secondary" onClick={() => navigate(-1)} > <FaArrowLeft /> До каталогу </AppButton>
            </div>
          </div>
        </div>

        <section className="tour-details-section">
          <div className="tour-details-section-heading">
            <span className="tour-details-section-icon">
              <FaClipboardCheck />
            </span>

            <h2>Про тур</h2>
          </div>

          <p>{tour.description}</p>
        </section>

        <section className="tour-details-section">
          <div className="tour-details-section-heading">
            <span className="tour-details-section-icon">
              <FaGlobe />
            </span>

            <h2>Основна інформація</h2>
          </div>

          <div className="tour-details-grid">
            <div className="tour-details-feature">
              <span className="tour-details-feature-icon">
                <FaCalendarAlt />
              </span>

              <div>
                <strong>Дати туру</strong>
                <p>{tour.date}</p>
              </div>
            </div>

            <div className="tour-details-feature">
              <span className="tour-details-feature-icon">
                <FaBus />
              </span>

              <div>
                <strong>Транспорт</strong>
                <p>{tour.transport}</p>
              </div>
            </div>

            <div className="tour-details-feature">
              <span className="tour-details-feature-icon">
                <FaUtensils />
              </span>

              <div>
                <strong>Харчування</strong>
                <p>{tour.food}</p>
              </div>
            </div>

            <div className="tour-details-feature">
              <span className="tour-details-feature-icon">
                <FaUsers />
              </span>

              <div>
                <strong>Кількість туристів</strong>
                <p>{tour.travelers}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="tour-details-section tour-details-booking">
          <span className="tour-details-booking-icon">
            <MdAirplanemodeActive  />
          </span>

          <h2>Готові до подорожі?</h2>

          <p>
            Оберіть цей тур та перейдіть до оформлення заявки.
          </p>

          <AppButton
            variant="primary"
            onClick={handlePrepareBooking}
          >
            <FaClipboardCheck />
            Оформити заявку
          </AppButton>
        </section>
      </div>
    </div>
  );
}