import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/zooftware_logo(corregido).png';
import '../styles/diagnosticoform.css';
import { FaPaperPlane, FaArrowRight } from 'react-icons/fa';

function DiagnosticoForm() {
  const [sintomas, setSintomas] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/chat/', {
        prompt: sintomas,
      });
      setRespuesta(res.data.message);
    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
      setRespuesta("Error al obtener respuesta de la IA. Inténtalo nuevamente.");
    }

    setSintomas('');
  };

  return (
    <div className="chat-container">
      {!respuesta && (
        <div className="welcome-message">
          <h1>Bienvenido a Zooftware</h1>
        </div>
      )}

      <div className="chat-box">
        {respuesta && (
          <div className="chat-response">
            <img src={logo} alt="Perfil" className="profile-pic" />
            <p>{respuesta}</p>
          </div>
        )}
      </div>

      <form className="input-area" onSubmit={handleSubmit}>
        <textarea
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Introduce una petición aquí"
          rows="1"
          className="input-box"
          style={{ resize: 'none' }}
        />
        <button type="submit" className="send-button">
          {sintomas ? <FaArrowRight /> : <FaPaperPlane />}
        </button>
      </form>
    </div>
  );
}

export default DiagnosticoForm;
