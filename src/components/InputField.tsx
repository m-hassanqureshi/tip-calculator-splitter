import React from 'react';

export const InputField: React.FC<any> = ({ label, id, value, onChange }) => {
  return (
    <div className="input-field-wrapper">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};
export default InputField;