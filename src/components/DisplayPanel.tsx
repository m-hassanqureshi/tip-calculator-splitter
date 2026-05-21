import React from 'react';

export const DisplayPanel: React.FC<any> = ({ totalTip, grandTotal }) => {
  const formatAmount = (val: number) => val.toFixed(2);
  return (
    <div className="display-panel">
      <div>Total Tip: {formatAmount(totalTip)}</div>
      <div>Grand Total: {formatAmount(grandTotal)}</div>
    </div>
  );
};
export default DisplayPanel;