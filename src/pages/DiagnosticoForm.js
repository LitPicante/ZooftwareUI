import React, { useState } from 'react';
import axios from 'axios'; // Importa axios
import '../App.css';
import { FaPaperPlane } from 'react-icons/fa';

function DiagnosticoForm() {
  const [sintomas, setSintomas] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar el prompt al backend
      const res = await axios.post('http://localhost:8000/api/chat/', {
        prompt: sintomas,
      });

      // Establecer la respuesta obtenida de la IA
      setRespuesta(res.data.message);
    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
      setRespuesta("Error al obtener respuesta de la IA. Inténtalo nuevamente.");
    }

    // Limpiar el cuadro de texto después de enviar
    setSintomas('');
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
          style={{ resize: 'none' }}
        />
        <button type="submit" className="send-button">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default DiagnosticoForm;
