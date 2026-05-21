import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  icon?: React.ReactNode;
  inputMode?: 'decimal' | 'numeric' | 'text';
  autoComplete?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  icon,
  inputMode = 'text',
  autoComplete = 'off',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize input: allow digits, decimals, commas, and avoid pasting garbage
    let val = e.target.value;
    
    // Replace commas with dots for decimals
    val = val.replace(/,/g, '.');
    
    // We let the custom hook validate, but we can do a quick basic character filter here to prevent junk
    // If it's a numeric or decimal input, filter out characters that aren't digits, dots, or signs
    if (inputMode === 'decimal') {
      // Allow only numbers and a single dot
      val = val.replace(/[^0-9.]/g, '');
      const parts = val.split('.');
      if (parts.length > 2) {
        val = parts[0] + '.' + parts.slice(1).join('');
      }
    } else if (inputMode === 'numeric') {
      // Allow only digits
      val = val.replace(/[^0-9]/g, '');
    }

    onChange(val);
  };

  const handleClear = () => {
    onChange('');
  };

  const hasError = !!error;
  const errorId = `${id}-error`;

  return (
    <div className={`input-field-wrapper ${hasError ? 'has-error' : ''}`}>
      <div className="input-header">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        {hasError && (
          <span 
            id={errorId} 
            className="input-error-msg" 
            role="alert" 
            aria-live="polite"
          >
            {error}
          </span>
        )}
      </div>

      <div className="input-container">
        {icon && <span className="input-icon" aria-hidden="true">{icon}</span>}
        
        <input
          id={id}
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`custom-input ${icon ? 'has-icon' : ''}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          autoComplete={autoComplete}
        />

        {value && (
          <button
            type="button"
            className="input-clear-btn"
            onClick={handleClear}
            aria-label={`Clear ${label}`}
            tabIndex={-1} // Don't disrupt tab order, but allow keyboard users to click if they backspace
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
export default InputField;
