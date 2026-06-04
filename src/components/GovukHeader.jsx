import { Link } from 'react-router-dom';

function GovukHeader() {
  return (
    <header className="govuk-header" role="banner">
      <div className="govuk-header__container">
        {/* Router Link, not a plain <a href="/">: keeps SPA navigation, applies
            the router basename (the /proxy/<port> prefix), and preserves the
            in-memory formData instead of triggering a full page reload. */}
        <Link to="/" className="govuk-header__link">
          GOV.UK
        </Link>
      </div>
    </header>
  );
}

export default GovukHeader;
