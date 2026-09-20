import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function AppLayout({ title, links, children }) {
  return (
    <div className="app-container">
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>

      <Header title={title} links={links} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer appTitle={title} />
    </div>
  );
}