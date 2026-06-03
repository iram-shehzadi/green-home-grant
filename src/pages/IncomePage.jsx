import QuestionPage from '../components/QuestionPage';

const FIELD = 'income';

// Values must match the answer vocabulary in CLAUDE.md (used by eligibility.js).
const OPTIONS = [
  { value: 'under-31000', label: 'Less than £31,000' },
  { value: '31000-50000', label: '£31,000 to £50,000' },
  { value: 'over-50000', label: '£50,000 or more' },
];

function IncomePage({ formData, updateField }) {
  return (
    <QuestionPage
      question="What is your annual household income?"
      fieldName={FIELD}
      options={OPTIONS}
      value={formData[FIELD]}
      onChange={(value) => updateField(FIELD, value)}
      backPath="/ownership"
      nextPath="/insulation"
      errorMessage="Select your annual household income"
      hint="Include the income of everyone who lives with you, before tax."
    />
  );
}

export default IncomePage;
