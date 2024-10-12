import React, { useState } from 'react';
import '../App.css';  // Si tienes tu CSS en App.css o DiagnosticoForm.css

import { FaPaperPlane } from 'react-icons/fa';

function DiagnosticoForm() {
  const [sintomas, setSintomas] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular la respuesta de la IA
    setRespuesta("Diagnóstico sugerido: IA responderá aquí.");
    setSintomas(''); // Limpiar el cuadro de texto después de enviar
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {!respuesta && (
          <div className="welcome-message">
            <h1>Bienvenido a Zooftware</h1>
          </div>
        )}
        {respuesta && (
          <div className="chat-response">
            <p>{respuesta}</p>
          </div>
        )}
      </div>

      <form className="input-area" onSubmit={handleSubmit}>
        <textarea
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          placeholder="Introduce una petición aquí"
          rows="1"
          className="input-box"
          style={{ resize: 'none' }} // Evitar que el usuario pueda cambiar el tamaño manualmente
        />
        <button type="submit" className="send-button">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default DiagnosticoForm;
