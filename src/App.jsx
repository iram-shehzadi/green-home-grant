import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import GovukHeader from './components/GovukHeader';
import GovukFooter from './components/GovukFooter';
import PhaseBanner from './components/PhaseBanner';
import StartPage from './pages/StartPage';
import PropertyTypePage from './pages/PropertyTypePage';
import OwnershipPage from './pages/OwnershipPage';
import IncomePage from './pages/IncomePage';
import InsulationPage from './pages/InsulationPage';
import HeatingPage from './pages/HeatingPage';
import CheckAnswersPage from './pages/CheckAnswersPage';
import ResultPage from './pages/ResultPage';
import AccessibilityStatementPage from './pages/AccessibilityStatementPage';

function App() {
  // Single source of truth: every answer lives here and is passed to each
  // question page via props (see CLAUDE.md — never store answers in a page).
  const [formData, setFormData] = useState({
    propertyType: '',
    ownership: '',
    income: '',
    insulation: '',
    heating: '',
  });

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // Move focus to the main region on each route change (but not the initial
  // load) so keyboard and screen-reader users are oriented to the new page.
  const mainRef = useRef(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="govuk-skip-link">
        Skip to main content
      </a>
      <GovukHeader />
      <div className="govuk-width-container">
        <PhaseBanner phase="alpha" feedbackHref="#" />
        <main
          className="govuk-main-wrapper"
          id="main-content"
          role="main"
          tabIndex={-1}
          ref={mainRef}
        >
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/property-type"
              element={
                <PropertyTypePage formData={formData} updateField={updateField} />
              }
            />
            <Route
              path="/ownership"
              element={
                <OwnershipPage formData={formData} updateField={updateField} />
              }
            />
            <Route
              path="/income"
              element={
                <IncomePage formData={formData} updateField={updateField} />
              }
            />
            <Route
              path="/insulation"
              element={
                <InsulationPage formData={formData} updateField={updateField} />
              }
            />
            <Route
              path="/heating"
              element={
                <HeatingPage formData={formData} updateField={updateField} />
              }
            />
            <Route
              path="/check-answers"
              element={<CheckAnswersPage formData={formData} />}
            />
            <Route
              path="/result"
              element={<ResultPage formData={formData} updateField={updateField} />}
            />
            <Route path="/accessibility-statement" element={<AccessibilityStatementPage />} />
          </Routes>
        </main>
      </div>
      <GovukFooter />
    </>
  );
}

export default App;
