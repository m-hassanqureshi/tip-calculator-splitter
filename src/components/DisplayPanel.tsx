import React from 'react';

export const DisplayPanel: React.FC<any> = ({ currency, totalTip, grandTotal, perPersonTotal }) => {
  const formatAmount = (val: number) => val.toFixed(2);
  return (
    <div className="display-panel">
      <div className="display-outputs-container">
        <div className="display-row">
          <span>Tip Amount</span>
          <span>{currency.symbol}{formatAmount(totalTip)}</span>
        </div>
        <div className="display-row">
          <span>Total Share</span>
          <span>{currency.symbol}{formatAmount(perPersonTotal)}</span>
        </div>
      </div>
    </div>
  );
};
export default DisplayPanel;