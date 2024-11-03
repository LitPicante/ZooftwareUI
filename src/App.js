import React from 'react';
import DiagnosticoForm from './pages/DiagnosticoForm';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#f1f1f1' }}>
      <Navbar />
      <DiagnosticoForm />
    </div>
  );
}

export default App;
