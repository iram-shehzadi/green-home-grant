import { checkEligibility } from '../utils/eligibility';

// Maps the scheme codes returned by checkEligibility to human-readable text.
const SCHEME_LABELS = {
  insulation: 'Home insulation',
  'heat-pump': 'A heat pump',
};

const FICTIONAL_NOTE =
  'These eligibility rules are fictional and for demonstration purposes only. ' +
  'The Green Home Grant is not a real government scheme.';

function SchemesList({ schemes }) {
  if (!schemes || schemes.length === 0) return null;
  return (
    <>
      <h2 className="govuk-heading-m">What you could get funding for</h2>
      <ul className="govuk-list govuk-list--bullet">
        {schemes.map((scheme) => (
          <li key={scheme}>{SCHEME_LABELS[scheme] || scheme}</li>
        ))}
      </ul>
    </>
  );
}

function NextSteps({ nextSteps }) {
  if (!nextSteps || nextSteps.length === 0) return null;
  return (
    <>
      <h2 className="govuk-heading-m">What you need to do next</h2>
      <ul className="govuk-list govuk-list--bullet">
        {nextSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </>
  );
}

// Renders the eligibility outcome. Following the GOV.UK "Check a service is
// suitable" pattern, every outcome is shown as a plain page heading + body text.
// The confirmation panel is only for completed transactions (not eligibility
// checks), and GOV.UK Frontend has no negative/grey panel variant.
const TITLES = {
  eligible: 'You may be eligible for a Green Home Grant',
  partial: 'You may be eligible for partial funding',
  'not-eligible': 'You are not eligible for a Green Home Grant',
};

function ResultPage({ formData }) {
  const { outcome, schemes, reason, nextSteps } = checkEligibility(formData || {});
  const title = TITLES[outcome] || TITLES['not-eligible'];

  return (
    <>
      <h1 className="govuk-heading-xl">{title}</h1>

      <p className="govuk-body">{reason}</p>

      <SchemesList schemes={schemes} />
      <NextSteps nextSteps={nextSteps} />

      <p className="govuk-hint">{FICTIONAL_NOTE}</p>
    </>
  );
}

export default ResultPage;
