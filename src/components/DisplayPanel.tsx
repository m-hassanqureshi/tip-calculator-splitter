import React from 'react';
import type { CurrencyConfig } from '../hooks/useCalculator';

interface DisplayPanelProps {
  currency: CurrencyConfig;
  totalTip: number;
  grandTotal: number;
  perPersonBill: number;
  perPersonTip: number;
  perPersonTotal: number;
  isResetEnabled: boolean;
  onReset: () => void;
}

export const DisplayPanel: React.FC<DisplayPanelProps> = ({
  currency,
  totalTip,
  grandTotal,
  perPersonBill,
  perPersonTip,
  perPersonTotal,
  isResetEnabled,
  onReset,
}) => {
  // Format numbers to 2 decimal places with local string grouping (e.g., 10,000.00)
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Dynamically size text if the number gets extremely large to prevent visual overflow
  const getValueFontSizeClass = (amount: number) => {
    const len = formatAmount(amount).length;
    if (len > 15) return 'text-xs-val';
    if (len > 12) return 'text-sm-val';
    if (len > 9) return 'text-md-val';
    return 'text-lg-val';
  };

  return (
    <div className="display-panel">
      <div className="display-outputs-container">
        
        {/* Row 1: Tip Amount (Total) */}
        <div className="display-row">
          <div className="display-label-group">
            <span className="display-title">Tip Amount</span>
            <span className="display-subtitle">Total</span>
          </div>
          <div 
            className={`display-value ${getValueFontSizeClass(totalTip)}`}
            aria-live="polite"
          >
            <span className="val-symbol">{currency.symbol}</span>
            <span className="val-number">{formatAmount(totalTip)}</span>
          </div>
        </div>

        {/* Row 2: Grand Total (Total) */}
        <div className="display-row">
          <div className="display-label-group">
            <span className="display-title">Grand Total</span>
            <span className="display-subtitle">Bill + Tip</span>
          </div>
          <div 
            className={`display-value ${getValueFontSizeClass(grandTotal)}`}
            aria-live="polite"
          >
            <span className="val-symbol">{currency.symbol}</span>
            <span className="val-number">{formatAmount(grandTotal)}</span>
          </div>
        </div>

        {/* Separator line */}
        <div className="display-separator" aria-hidden="true" />

        {/* Row 3: Per-Person Bill (Base) */}
        <div className="display-row secondary-row">
          <div className="display-label-group">
            <span className="display-title">Base Share</span>
            <span className="display-subtitle">/ person</span>
          </div>
          <div 
            className={`display-value secondary-val ${getValueFontSizeClass(perPersonBill)}`}
            aria-live="polite"
          >
            <span className="val-symbol">{currency.symbol}</span>
            <span className="val-number">{formatAmount(perPersonBill)}</span>
          </div>
        </div>

        {/* Row 4: Per-Person Tip */}
        <div className="display-row secondary-row">
          <div className="display-label-group">
            <span className="display-title">Tip Share</span>
            <span className="display-subtitle">/ person</span>
          </div>
          <div 
            className={`display-value secondary-val ${getValueFontSizeClass(perPersonTip)}`}
            aria-live="polite"
          >
            <span className="val-symbol">{currency.symbol}</span>
            <span className="val-number">{formatAmount(perPersonTip)}</span>
          </div>
        </div>

        {/* Row 5: Per-Person Total (Highlight) */}
        <div className="display-row highlighted-row">
          <div className="display-label-group">
            <span className="display-title highlight-title">Total Share</span>
            <span className="display-subtitle highlight-subtitle">/ person</span>
          </div>
          <div 
            className={`display-value highlight-val ${getValueFontSizeClass(perPersonTotal)}`}
            aria-live="polite"
          >
            <span className="val-symbol">{currency.symbol}</span>
            <span className="val-number">{formatAmount(perPersonTotal)}</span>
          </div>
        </div>

      </div>

      <button
        type="button"
        className="reset-btn"
        disabled={!isResetEnabled}
        onClick={onReset}
        aria-label="Reset calculator inputs"
      >
        RESET
      </button>
    </div>
  );
};
export default DisplayPanel;
