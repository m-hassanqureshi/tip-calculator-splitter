import React from 'react';

interface TipPresetGridProps {
  value: string;
  activePreset: number | null;
  onChange: (value: string, preset: number | null) => void;
  error?: string;
}

const PRESETS = [5, 10, 15, 20, 25];

export const TipPresetGrid: React.FC<TipPresetGridProps> = ({
  value,
  activePreset,
  onChange,
  error,
}) => {
  const handlePresetClick = (preset: number) => {
    // If clicking already active preset, clear it. Otherwise set it.
    if (activePreset === preset) {
      onChange('', null);
    } else {
      onChange(preset.toString(), preset);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Sanitize: allow only digits and single dot
    val = val.replace(/[^0-9.]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) {
      val = parts[0] + '.' + parts.slice(1).join('');
    }

    onChange(val, null);
  };

  // Check if current value is custom (i.e. not one of the presets or empty with no preset active)
  const isCustomActive = activePreset === null && value !== '';
  const errorId = 'tip-error';

  return (
    <div className="tip-preset-wrapper">
      <div className="input-header">
        <label className="input-label" htmlFor="custom-tip-input">
          Select Tip %
        </label>
        {error && (
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

      <div className="tip-grid" role="group" aria-label="Tip Percentage Presets">
        {PRESETS.map((preset) => {
          const isActive = activePreset === preset;
          return (
            <button
              key={preset}
              type="button"
              className={`tip-btn ${isActive ? 'active' : ''}`}
              onClick={() => handlePresetClick(preset)}
              aria-pressed={isActive}
            >
              {preset}%
            </button>
          );
        })}

        <div className={`custom-tip-container ${isCustomActive ? 'active' : ''}`}>
          <input
            id="custom-tip-input"
            type="text"
            inputMode="decimal"
            placeholder="Custom"
            value={activePreset !== null ? '' : value}
            onChange={handleCustomChange}
            className="custom-tip-input-field"
            aria-label="Custom tip percentage"
            aria-invalid={!!error && activePreset === null}
            aria-describedby={error && activePreset === null ? errorId : undefined}
          />
          <span className="custom-tip-suffix" aria-hidden="true">%</span>
        </div>
      </div>
    </div>
  );
};
export default TipPresetGrid;
