import HomePage from './pages/HomePage/HomePage';
import './App.css';

export default function App() {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Travel Agency';
  
  return (
    <div className="app">

      <header className="site-header">

        <div className="header-content">
          <h1>Travel Agency</h1>

          <nav>
            <a href="#about">Про нас</a>
            <a href="#catalog">Каталог</a>
          </nav>
        </div>

      </header>

      <HomePage />

      <footer className="site-footer">
        <p>
          © 2026 {appTitle}. Навчальний проєкт.
        </p>
      </footer>

    </div>
  );
}