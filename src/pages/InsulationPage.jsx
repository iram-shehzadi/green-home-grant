import QuestionPage from '../components/QuestionPage';

const FIELD = 'insulation';

const OPTIONS = [
  { value: 'both', label: 'Yes, both wall and loft insulation' },
  { value: 'wall', label: 'Yes, wall insulation only' },
  { value: 'loft', label: 'Yes, loft insulation only' },
  { value: 'none', label: 'No insulation' },
  { divider: 'or' },
  { value: 'dont-know', label: 'I do not know' },
];

function InsulationPage({ formData, updateField }) {
  return (
    <QuestionPage
      question="Does your property have wall or loft insulation?"
      fieldName={FIELD}
      options={OPTIONS}
      value={formData[FIELD]}
      onChange={(value) => updateField(FIELD, value)}
      backPath="/income"
      nextPath="/heating"
      errorMessage="Select whether your property has wall or loft insulation"
    />
  );
}

export default InsulationPage;
