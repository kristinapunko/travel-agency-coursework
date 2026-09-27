import { Link } from "react-router";
import {
  FaGlobe,
  FaPlaneDeparture,
  FaCalendarAlt,
} from "react-icons/fa";

import PageHeading from "../../components/ui/PageHeading";
import AppButton from "../../components/ui/AppButton";

import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-page-hero">
        <div className="home-page-content">
          <p className="home-page-label">
            Travel Agency
          </p>

          <PageHeading
            title="Туристичне агентство «Travel Agency»"
          />

          <p className="home-page-description">
            Організація подорожей світом. Переглядайте каталог
            турів, дізнавайтеся деталі маршрутів та оформлюйте
            заявки на свою наступну подорож.
          </p>

          <div className="home-page-actions">
            <Link to="/tours">
              <AppButton variant="primary">
                Перейти до каталогу турів
              </AppButton>
            </Link>

            <Link to="/bookings">
              <AppButton variant="secondary">
                Переглянути мої заявки
              </AppButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-page-info">
        <div className="home-page-info-content">
          <p className="home-page-label">
            Про агентство
          </p>

          <h2>Подорожуйте легко та комфортно</h2>

          <p>
            Обирайте туристичні маршрути, переглядайте інформацію
            про країни та оформлюйте заявки на подорож.
          </p>
        </div>

        <div className="home-page-features">
          <div className="home-page-feature">
            <span className="home-page-feature-icon">
              <FaGlobe />
            </span>

            <h3>Цікаві напрямки</h3>

            <p>
              Каталог турів для подорожей різними країнами світу.
            </p>
          </div>

          <div className="home-page-feature">
            <span className="home-page-feature-icon">
              <FaCalendarAlt />
            </span>

            <h3>Просте оформлення</h3>

            <p>
              Оберіть тур та заповніть заявку без зайвих кроків.
            </p>
          </div>

          <div className="home-page-feature">
            <span className="home-page-feature-icon">
              <FaPlaneDeparture />
            </span>

            <h3>Зручні подорожі</h3>

            <p>
              Переглядайте всі важливі деталі туру перед вибором.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}