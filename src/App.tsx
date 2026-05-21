import React from 'react';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SPLITWISELY</h1>
      </header>
      <main className="calculator-card">
        <div>Calculator Panel</div>
      </main>
    </div>
  );
};
export default App;