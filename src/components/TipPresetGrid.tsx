import React from 'react';

export const TipPresetGrid: React.FC<any> = ({ value, onChange }) => {
  return (
    <div className="tip-preset-wrapper">
      <label>Select Tip %</label>
      <div className="tip-grid">
        {[10, 15, 20].map(p => (
          <button key={p} onClick={() => onChange(p.toString(), p)}>{p}%</button>
        ))}
      </div>
    </div>
  );
};
export default TipPresetGrid;