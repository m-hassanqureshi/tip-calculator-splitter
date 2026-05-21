import React from 'react';
import { useCalculator, CURRENCIES } from './hooks/useCalculator';
import type { Currency } from './hooks/useCalculator';
import InputField from './components/InputField';
import TipPresetGrid from './components/TipPresetGrid';
import DisplayPanel from './components/DisplayPanel';
import './App.css';

export const App: React.FC = () => {
  const {
    state,
    errors,
    outputs,
    isResetEnabled,
    setBill,
    setTipPercent,
    setPeople,
    setCurrency,
    reset,
  } = useCalculator();

  const activeCurrencyConfig = CURRENCIES[state.currency];

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-icon" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <path d="M16 10a2 2 0 0 0-2-2h-3a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-3a2 2 0 0 1-2-2" />
            </svg>
          </span>
          SPLITWISELY
        </div>
        <p className="app-title-desc">Tip Calculator & Bill Splitter</p>
      </header>

      {/* Main Card */}
      <main className="calculator-card">
        {/* Left Pane: Inputs */}
        <section className="inputs-panel" aria-label="Calculator Inputs">
          
          {/* Currency Header Row */}
          <div className="currency-selector-row">
            <h2 className="panel-section-title">Split Configuration</h2>
            <div className="currency-select-wrapper">
              <label htmlFor="currency-select" className="sr-only" style={{ display: 'none' }}>
                Select Currency
              </label>
              <select
                id="currency-select"
                value={state.currency}
                onChange={handleCurrencyChange}
                className="currency-select"
                aria-label="Currency"
              >
                {Object.entries(CURRENCIES).map(([code, cfg]) => (
                  <option key={code} value={code}>
                    {cfg.symbol} {code}
                  </option>
                ))}
              </select>
              <span className="currency-select-arrow" aria-hidden="true">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </div>

          {/* Bill Input */}
          <InputField
            id="bill-input"
            label="Bill Amount"
            value={state.bill}
            onChange={setBill}
            placeholder="0.00"
            error={errors.bill}
            inputMode="decimal"
            icon={<span className="currency-symbol-icon">{activeCurrencyConfig.symbol}</span>}
          />

          {/* Tip Presets */}
          <TipPresetGrid
            value={state.tipPercent}
            activePreset={state.activePreset}
            onChange={setTipPercent}
            error={errors.tipPercent}
          />

          {/* Number of People */}
          <InputField
            id="people-input"
            label="Number of People"
            value={state.people}
            onChange={setPeople}
            placeholder="1"
            error={errors.people}
            inputMode="numeric"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
          />
        </section>

        {/* Right Pane: Outputs */}
        <section className="outputs-panel" aria-label="Calculated Summary">
          <DisplayPanel
            currency={activeCurrencyConfig}
            totalTip={outputs.totalTip}
            grandTotal={outputs.grandTotal}
            perPersonBill={outputs.perPersonBill}
            perPersonTip={outputs.perPersonTip}
            perPersonTotal={outputs.perPersonTotal}
            isResetEnabled={isResetEnabled}
            onReset={reset}
          />
        </section>
      </main>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>
          Designed for maximum accessibility & accuracy. Rounding policy: <strong>Ceil Rounding</strong>.
        </p>
      </footer>
    </div>
  );
};

export default App;
