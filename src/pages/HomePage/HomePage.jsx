import CatalogSummary from "../../components/tours/CatalogSummary/CatalogSummary";
import TourList from "../../components/tours/TourList/TourList";
import { tours } from "../../data/tours";
import Section from "../../components/ui/Section";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page-container">
      <Section id="about" title="Подорожі, які хочеться запам'ятати">
        <div className="about-content">
          <p className="section-label">TRAVEL AGENCY</p>
          <p className="about-text">
            Ми допомагаємо знаходити цікаві туристичні пропозиції для відпочинку,
            подорожей та нових вражень. Обирайте тур, переглядайте деталі та
            плануйте свою наступну подорож онлайн.
          </p>
        </div>
      </Section>

      <Section id="catalog" title="Каталог турів">
        <div className="catalog-header-bar">
          <p className="section-label">НАШІ ПРОПОЗИЦІЇ</p>
          <CatalogSummary total={tours.length} />
        </div>
        <TourList items={tours} />
      </Section>
    </div>
  );
}