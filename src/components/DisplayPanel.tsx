import React from 'react';

export const DisplayPanel: React.FC<any> = ({ totalTip, grandTotal }) => {
  const formatAmount = (val: number) => val.toFixed(2);
  const getFontSize = (amount: number) => amount > 100000 ? 'small' : 'large';
  return (
    <div className="display-panel">
      <div className={getFontSize(totalTip)}>Total Tip: {formatAmount(totalTip)}</div>
      <div className={getFontSize(grandTotal)}>Grand Total: {formatAmount(grandTotal)}</div>
    </div>
  );
};
export default DisplayPanel;