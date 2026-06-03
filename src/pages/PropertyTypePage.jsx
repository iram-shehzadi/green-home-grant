import QuestionPage from '../components/QuestionPage';

const FIELD = 'propertyType';

// Values must match the answer vocabulary in CLAUDE.md (used by eligibility.js).
const OPTIONS = [
  { value: 'house', label: 'House' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'flat', label: 'Flat' },
  { value: 'maisonette', label: 'Maisonette' },
  { value: 'other', label: 'Other' },
];

function PropertyTypePage({ formData, updateField }) {
  return (
    <QuestionPage
      question="What type of property do you live in?"
      fieldName={FIELD}
      options={OPTIONS}
      value={formData[FIELD]}
      onChange={(value) => updateField(FIELD, value)}
      backPath="/"
      nextPath="/ownership"
      errorMessage="Select the type of property you live in"
    />
  );
}

export default PropertyTypePage;
