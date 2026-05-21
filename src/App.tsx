import React from 'react';
import { useCalculator, CURRENCIES } from './hooks/useCalculator';
import InputField from './components/InputField';
import TipPresetGrid from './components/TipPresetGrid';
import DisplayPanel from './components/DisplayPanel';
import './App.css';

export const App: React.FC = () => {
  const { state, errors, outputs, isResetEnabled, setBill, setTipPercent, setPeople, reset } = useCalculator();
  const currencyConfig = CURRENCIES[state.currency];
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SPLITWISELY</h1>
      </header>
      <main className="calculator-card">
        <section className="inputs-panel">
          <InputField id="bill" label="Bill" value={state.bill} onChange={setBill} />
          <TipPresetGrid value={state.tipPercent} onChange={setTipPercent} />
          <InputField id="people" label="People" value={state.people} onChange={setPeople} />
        </section>
        <section className="outputs-panel">
          <DisplayPanel currency={currencyConfig} {...outputs} isResetEnabled={isResetEnabled} onReset={reset} />
        </section>
      </main>
    </div>
  );
};
export default App;