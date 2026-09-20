import MainNav from "../../navigation/MainNav.jsx";
import "./Header.css";

export default function Header({ title, links }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">

        <a href="/" className="site-logo">
          <span className="site-logo-mark">✈</span>
          <span className="site-logo-text">{title}</span>
        </a>

        <div className="site-navigation">
          <MainNav links={links} />
        </div>

      </div>
    </header>
  );
}