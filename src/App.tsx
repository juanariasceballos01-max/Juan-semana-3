import React from 'react';
import { Dashboard } from './components/Dashboard';

// Definimos el componente como un Functional Component (FC) de React
const App: React.FC = () => {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default App;