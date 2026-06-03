import QuestionPage from '../components/QuestionPage';

const FIELD = 'ownership';

// Values must match the answer vocabulary in CLAUDE.md (used by eligibility.js).
const OPTIONS = [
  { value: 'own', label: 'Own it (with or without a mortgage)' },
  { value: 'private-rent', label: 'Rent from a private landlord' },
  { value: 'housing-association', label: 'Rent from a housing association' },
  { value: 'council', label: 'Rent from the council' },
];

function OwnershipPage({ formData, updateField }) {
  return (
    <QuestionPage
      question="Do you own or rent your property?"
      fieldName={FIELD}
      options={OPTIONS}
      value={formData[FIELD]}
      onChange={(value) => updateField(FIELD, value)}
      backPath="/property-type"
      nextPath="/income"
      errorMessage="Select whether you own or rent your property"
    />
  );
}

export default OwnershipPage;
