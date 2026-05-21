import React from 'react';

export const InputField: React.FC<any> = ({ label, id, value, onChange, inputMode }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/,/g, '.');
    if (inputMode === 'decimal') {
      val = val.replace(/[^0-9.]/g, '');
    }
    onChange(val);
  };

  return (
    <div className="input-field-wrapper">
      <label htmlFor={id}>{label}</label>
      <div className="input-container">
        <input id={id} value={value} onChange={handleChange} />
        {value && <button onClick={() => onChange('')}>Clear</button>}
      </div>
    </div>
  );
};
export default InputField;