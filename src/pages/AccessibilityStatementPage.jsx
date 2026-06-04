import { Link } from 'react-router-dom';

// No <main> here: App.jsx already wraps every route in a single <main>
// landmark, so this page returns its content inside a fragment to avoid a
// nested/duplicate main.
export default function AccessibilityStatementPage() {
  return (
    <>
      <Link to="/" className="govuk-back-link">
        Back
      </Link>

      <h1 className="govuk-heading-xl">Accessibility statement</h1>

      <p className="govuk-body">
        This accessibility statement applies to the Check if you can get a Green
        Home Grant service. This service is a demonstration built to GOV.UK
        Design System standards.
      </p>

      <h2 className="govuk-heading-l">How accessible this service is</h2>
      <p className="govuk-body">
        We aim to make this service accessible to as many people as possible.
        The service:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li>can be navigated and operated using a keyboard alone</li>
        <li>has a “Skip to main content” link and visible focus indicators</li>
        <li>uses text, not colour alone, to convey every outcome</li>
        <li>reflows to a single column down to 320px without horizontal scrolling</li>
        <li>meets a minimum 4.5:1 colour-contrast ratio for body text</li>
      </ul>

      <h2 className="govuk-heading-l">Feedback and contact information</h2>
      <p className="govuk-body">
        If you find any problem not listed on this page, or think we are not
        meeting accessibility requirements, contact the service team at{' '}
        <a className="govuk-link" href="mailto:accessibility@example.gov.uk">
          accessibility@example.gov.uk
        </a>
        . We will consider your request and get back to you within 5 working
        days.
      </p>

      <h2 className="govuk-heading-l">Technical information about this service’s accessibility</h2>
      <p className="govuk-body">
        We are committed to making this service accessible, in accordance with
        the Public Sector Bodies (Websites and Mobile Applications) (No. 2)
        Accessibility Regulations 2018.
      </p>
      <p className="govuk-body">
        This service is partially compliant with the{' '}
        <a
          className="govuk-link"
          href="https://www.w3.org/TR/WCAG22/"
          rel="noreferrer noopener"
          target="_blank"
        >
          Web Content Accessibility Guidelines version 2.2 AA standard
        </a>
        , due to the non-compliances listed below.
      </p>

      <h2 className="govuk-heading-l">Non-accessible content</h2>
      <p className="govuk-body">
        The content listed below is non-accessible for the following reasons.
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          As a demonstration service, contact details and feedback routes are
          placeholders and are not monitored.
        </li>
        <li>
          The service has not yet been audited by an independent accessibility
          specialist or tested with a full range of assistive technologies.
        </li>
      </ul>

      <h2 className="govuk-heading-l">How we tested this service</h2>
      <p className="govuk-body">
        This service was tested for keyboard-only operation, visible focus,
        colour contrast and reflow at 320px width. Testing was carried out by
        the project team using browser developer tools and a contrast checker.
      </p>

      <h2 className="govuk-heading-l">What we’re doing to improve accessibility</h2>
      <p className="govuk-body">
        We will arrange an independent WCAG 2.2 AA audit and assistive-technology
        testing, and fix any issues found, before this service is considered for
        public use.
      </p>

      <p className="govuk-body">
        This statement was prepared on 4 June 2026.
      </p>
    </>
  );
}
