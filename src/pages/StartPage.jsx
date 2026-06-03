import { useNavigate } from 'react-router-dom';
import GovukButton from '../components/GovukButton';

function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <h1 className="govuk-heading-xl">
        Check if you can get a Green Home Grant
      </h1>
      <p className="govuk-body-l">
        Use this service to find out if you qualify for help to make your home
        more energy efficient, what improvements could be funded, and what to do
        next.
      </p>
      <p className="govuk-body">
        It takes around 5 minutes. You will be asked 5 questions about your
        property, how you occupy it, your household income and your current
        insulation and heating.
      </p>
      <p className="govuk-body">
        This service is for people in England who own their home or rent it from
        a council or housing association. If you rent privately, your landlord
        must apply.
      </p>
      <GovukButton variant="start" onClick={() => navigate('/property-type')}>
        Start now
      </GovukButton>
    </div>
  );
}

export default StartPage;
