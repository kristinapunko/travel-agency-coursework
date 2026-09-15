import HomePage from './pages/HomePage/HomePage';
import './App.css';

export default function App() {
  return (
    <div className="app">

      {/* Шапка сайту */}
      <header className="site-header">

        <div className="header-content">
          <h1>Travel Agency</h1>

          <nav>
            <a href="#about">Про нас</a>
            <a href="#catalog">Каталог</a>
          </nav>
        </div>

      </header>

      {/* Основний вміст */}
      <HomePage />

      {/* Футер */}
      <footer className="site-footer">
        <p>
          © 2026 Турагентство. Навчальний проєкт.
        </p>
      </footer>

    </div>
  );
}