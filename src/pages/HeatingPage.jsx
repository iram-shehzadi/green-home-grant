import QuestionPage from '../components/QuestionPage';

const FIELD = 'heating';

// Values must match the answer vocabulary in CLAUDE.md (used by eligibility.js).
const OPTIONS = [
  { value: 'gas', label: 'Gas boiler' },
  { value: 'oil', label: 'Oil boiler' },
  { value: 'electric', label: 'Electric heating' },
  { value: 'heat-pump', label: 'Heat pump' },
  { value: 'other', label: 'Other' },
];

function HeatingPage({ formData, updateField }) {
  return (
    <QuestionPage
      question="What is your main heating system?"
      fieldName={FIELD}
      options={OPTIONS}
      value={formData[FIELD]}
      onChange={(value) => updateField(FIELD, value)}
      backPath="/insulation"
      nextPath="/check-answers"
      errorMessage="Select your main heating system"
    />
  );
}

export default HeatingPage;
