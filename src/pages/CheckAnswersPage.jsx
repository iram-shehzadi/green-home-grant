import { useNavigate } from 'react-router-dom';
import GovukButton from '../components/GovukButton';

// One row per question. `label` is the short summary-list key (a noun phrase, not
// the full question); `changePath` is the question's route; `hiddenText` names the
// field for the visually-hidden part of the "Change" link (GOV.UK check-answers
// pattern). `values` maps the stored answer (see the answer vocabulary in CLAUDE.md)
// to human-readable text. Kept local for now — could move to shared config later.
const ROWS = [
  {
    field: 'propertyType',
    label: 'Property type',
    changePath: '/property-type',
    hiddenText: 'property type',
    values: {
      house: 'House',
      bungalow: 'Bungalow',
      flat: 'Flat',
      maisonette: 'Maisonette',
      other: 'Other',
    },
  },
  {
    field: 'ownership',
    label: 'Ownership',
    changePath: '/ownership',
    hiddenText: 'ownership status',
    values: {
      own: 'Own (with or without a mortgage)',
      'private-rent': 'Rent from a private landlord',
      'housing-association': 'Rent from a housing association',
      council: 'Rent from the council',
    },
  },
  {
    field: 'income',
    label: 'Household income',
    changePath: '/income',
    hiddenText: 'household income',
    values: {
      'under-31000': 'Less than £31,000',
      '31000-50000': '£31,000 to £50,000',
      'over-50000': '£50,000 or more',
    },
  },
  {
    field: 'insulation',
    label: 'Insulation',
    changePath: '/insulation',
    hiddenText: 'insulation',
    values: {
      both: 'Both wall and loft insulation',
      wall: 'Wall insulation only',
      loft: 'Loft insulation only',
      none: 'No insulation',
      'dont-know': 'I do not know',
    },
  },
  {
    field: 'heating',
    label: 'Heating system',
    changePath: '/heating',
    hiddenText: 'heating system',
    values: {
      gas: 'Gas boiler',
      oil: 'Oil boiler',
      electric: 'Electric heating',
      'heat-pump': 'Heat pump',
      other: 'Other',
    },
  },
];

function CheckAnswersPage({ formData }) {
  const navigate = useNavigate();
  const answers = formData || {};

  return (
    <>
      <h1 className="govuk-heading-l">Check your answers</h1>

      <dl className="govuk-summary-list">
        {ROWS.map((row) => {
          const value = answers[row.field];
          return (
            <div className="govuk-summary-list__row" key={row.field}>
              <dt className="govuk-summary-list__key">{row.label}</dt>
              <dd className="govuk-summary-list__value">
                {value ? row.values[value] : 'Not answered'}
              </dd>
              <dd className="govuk-summary-list__actions">
                <a
                  href={row.changePath}
                  className="govuk-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(row.changePath);
                  }}
                >
                  Change<span className="govuk-visually-hidden"> {row.hiddenText}</span>
                </a>
              </dd>
            </div>
          );
        })}
      </dl>

      <GovukButton onClick={() => navigate('/result')}>
        Accept and continue
      </GovukButton>
    </>
  );
}

export default CheckAnswersPage;
