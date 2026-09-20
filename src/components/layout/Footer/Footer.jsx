import { FaFacebookF, FaInstagram, FaYoutube, FaTelegram, FaTiktok } from "react-icons/fa";
import './Footer.css';

const footerSections = [
  {
    title: "Куди поїхати",
    links: ["Франція", "Італія", "Іспанія", "Гарячі тури"],
  },
  {
    title: "Види відпочинку",
    links: ["Відпочинок на морі", "Екскурсійні тури", "Сімейний відпочинок"],
  },
  {
    title: "Про компанію",
    links: ["Про нас", "Контакти", "Відгуки туристів"],
  },
];

const socialIcons = [
  { Icon: FaFacebookF, key: "fb" },
  { Icon: FaInstagram, key: "inst" },
  { Icon: FaYoutube, key: "yt" },
  { Icon: FaTelegram, key: "tg" },
  { Icon: FaTiktok, key: "tt" },
];

export default function Footer({ appTitle }) {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        {footerSections.map((sec) => (
          <div key={sec.title} className="footer-col">
            <h4>{sec.title}</h4>
            <ul>
              {sec.links.map((link) => (
                <li key={link}>
                  <a href="#catalog">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© 2026 {appTitle}. Всі права захищено.</span>
        <span>Автоматизація турагентства</span>
        <div className="footer-socials">
          {socialIcons.map(({ Icon, key }) => (
            <span key={key} className="social-icon">
              <Icon />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}