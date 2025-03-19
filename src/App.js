import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar';
import DiagnosticoForm from './pages/DiagnosticoForm';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import './App.css';

const AppContent = () => {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <div className="App" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#f1f1f1' }}>
      {/* Mostrar el Navbar solo si no estamos en la página de login */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <DiagnosticoForm />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
