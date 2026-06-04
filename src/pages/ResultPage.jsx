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

// Renders the eligibility outcome. Per CLAUDE.md, only the positive "eligible"
// outcome uses the green confirmation panel; "partial" and "not-eligible" are
// stated plainly with a heading, the reason, and what to do next.
function ResultPage({ formData }) {
  const { outcome, schemes, reason, nextSteps } = checkEligibility(formData || {});

  return (
    <>
      {outcome === 'eligible' ? (
        <div className="govuk-panel">
          <h1 className="govuk-panel__title">You may be eligible</h1>
          <div className="govuk-panel__body">for a Green Home Grant</div>
        </div>
      ) : (
        <h1 className="govuk-heading-xl">
          {outcome === 'partial'
            ? 'You may be eligible for partial funding'
            : 'You are not eligible for a Green Home Grant'}
        </h1>
      )}

      <p className="govuk-body">{reason}</p>

      <SchemesList schemes={schemes} />
      <NextSteps nextSteps={nextSteps} />

      <p className="govuk-hint">{FICTIONAL_NOTE}</p>
    </>
  );
}

export default ResultPage;
