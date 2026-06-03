import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GovukButton from './GovukButton';

/**
 * Reusable question page implementing the GOV.UK "one thing per page" pattern.
 *
 * UI it owns:        back link, error summary, fieldset legend/<h1>, radios.
 * State it owns:     only the transient validation error. The answer itself
 *                    lives in App.jsx's formData and is read/written through the
 *                    `value` / `onChange` props (see CLAUDE.md — one source of truth).
 * Navigation:        back link -> backPath, Continue -> nextPath (on a valid answer).
 *
 * Props:
 *   question     question text, rendered as the page <h1> inside the <legend>
 *   fieldName    the formData key (also used for element ids and the radio name)
 *   options      [{ value, label, hint?, divider? }] — `divider: 'or'` renders a
 *                divider row; otherwise a radio (with optional per-option hint)
 *   value        current answer from formData[fieldName]
 *   onChange     (value) => void — save the answer to the lifted state
 *   backPath     route the back link returns to
 *   nextPath     route Continue advances to
 *   errorMessage message shown if Continue is pressed with no answer selected
 *   hint         optional hint text shown under the question (govuk-hint)
 *   inline       render the radios in a row (govuk-radios--inline)
 */
function QuestionPage({
  question,
  fieldName,
  options,
  value,
  onChange,
  backPath,
  nextPath,
  errorMessage = 'Select an answer to continue',
  hint,
  inline = false,
}) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const hintId = hint ? `${fieldName}-hint` : undefined;
  const errorId = error ? `${fieldName}-error` : undefined;
  // aria-describedby chains the hint and error ids, per the GOV.UK pattern
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  function handleContinue() {
    if (!value) {
      setError(errorMessage);
      document.title = `Error: ${question} - GOV.UK`;
      // move focus to the summary so keyboard and screen-reader users hear the error
      setTimeout(() => document.getElementById('error-summary')?.focus(), 0);
      return;
    }
    setError('');
    navigate(nextPath);
  }

  return (
    <>
      <a
        href={backPath}
        className="govuk-back-link"
        onClick={(e) => {
          e.preventDefault();
          navigate(backPath);
        }}
      >
        Back
      </a>

      {error && (
        <div
          className="govuk-error-summary"
          id="error-summary"
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
        >
          <h2 className="govuk-error-summary__title" id="error-summary-title">
            There is a problem
          </h2>
          <ul className="govuk-error-summary__list">
            <li>
              <a href={`#${fieldName}`}>{error}</a>
            </li>
          </ul>
        </div>
      )}

      <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
        <fieldset className="govuk-fieldset" aria-describedby={describedBy}>
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">{question}</h1>
          </legend>

          {hint && (
            <div className="govuk-hint" id={hintId}>
              {hint}
            </div>
          )}

          {error && (
            <p className="govuk-error-message" id={errorId}>
              <span className="govuk-visually-hidden">Error: </span>
              {error}
            </p>
          )}

          <div
            className={`govuk-radios${inline ? ' govuk-radios--inline' : ''}`}
            id={fieldName}
            data-module="govuk-radios"
          >
            {options.map((option, index) => {
              if (option.divider) {
                return (
                  <div
                    className="govuk-radios__divider"
                    key={`divider-${index}`}
                  >
                    {option.divider}
                  </div>
                );
              }

              const optionHintId = option.hint
                ? `${fieldName}-${option.value}-hint`
                : undefined;

              return (
                <div className="govuk-radios__item" key={option.value}>
                  <input
                    className="govuk-radios__input"
                    id={`${fieldName}-${option.value}`}
                    name={fieldName}
                    type="radio"
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-describedby={optionHintId}
                  />
                  <label
                    className="govuk-radios__label"
                    htmlFor={`${fieldName}-${option.value}`}
                  >
                    {option.label}
                  </label>
                  {option.hint && (
                    <div className="govuk-radios__hint" id={optionHintId}>
                      {option.hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>

      <GovukButton onClick={handleContinue}>Continue</GovukButton>
    </>
  );
}

export default QuestionPage;
