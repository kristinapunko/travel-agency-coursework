import './CatalogSummary.css';

export default function CatalogSummary({ total }) {
  return (
    <p className="tour-count">
      Усього пропозицій: <strong>{total}</strong>
    </p>
  );
}