import TourCard from "../../components/TourCard/TourCard";
import { tours } from "../../data/tours";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home-page">

      {/* Секція "Про турагентство" */}
      <section id="about" className="about-section">
        <div className="about-content">
          <p className="section-label">TRAVEL AGENCY</p>

          <h2>Подорожі, які хочеться запам'ятати</h2>

          <p className="about-text">
            Ми допомагаємо знаходити цікаві туристичні пропозиції
            для відпочинку, подорожей та нових вражень.
            Обирайте тур, переглядайте деталі та плануйте
            свою наступну подорож онлайн.
          </p>
        </div>
      </section>


      {/* Секція "Каталог турів" */}
      <section id="catalog" className="catalog-section">

        <div className="catalog-header">
          <div>
            <p className="section-label">НАШІ ПРОПОЗИЦІЇ</p>

            <h2>Каталог турів</h2>
          </div>

          <p className="tour-count">
            Усього пропозицій:
            <strong>{tours.length}</strong>
          </p>
        </div>


        {/* Якщо турів немає */}
        {tours.length === 0 ? (
          <div className="empty-catalog">
            <p>Наразі актуальні тури відсутні.</p>
          </div>
        ) : (

          /* Список турів */
          <ul className="tour-grid">
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
              />
            ))}
          </ul>

        )}

      </section>

    </main>
  );
}