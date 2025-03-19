import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaCog, FaSignOutAlt, FaInfoCircle, FaTrash, FaEdit, FaComments } from 'react-icons/fa';
import logo from '../assets/zooftware_logo(corregido).png';
import '../styles/navbar.css';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showConversationsMenu, setShowConversationsMenu] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll('.dropdown-menu');
      if (![...dropdowns].some((dropdown) => dropdown.contains(event.target))) {
        setShowMenu(false);
        setShowConversationsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleConversationsMenu = () => setShowConversationsMenu((prev) => !prev);

  const addConversation = () => {
    const newConversation = `Conversación ${conversations.length + 1}`;
    setConversations((prev) => [...prev, { name: newConversation, id: Date.now() }]);
  };

  const handleDeleteConversation = (id) => {
    // Mostrar SweetAlert2 para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta conversación después de eliminarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Procede con la eliminación si el usuario confirma
        setConversations((prev) => prev.filter((conv) => conv.id !== id));
        Swal.fire('Eliminado', 'La conversación ha sido eliminada.', 'success');
      }
    });
  };

  const handleRenameConversation = (id) => {
    const newName = prompt('Introduce un nuevo nombre para la conversación:');
    if (newName) {
      setConversations((prev) =>
        prev.map((conv) => (conv.id === id ? { ...conv, name: newName } : conv))
      );
    }
  };

  const handleFeedback = () => {
    window.location.href = '/feedback';
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="Logo de Zooftware" className="navbar-logo" />
        <h1 className="navbar-title">Zooftware</h1>
      </div>

      <div className="navbar-actions">
        {/* Menú de conversaciones */}
        <div className="conversations-container">
          <FaComments
            className="conversations-icon"
            onClick={toggleConversationsMenu}
          />
          <ul className={`dropdown-menu ${showConversationsMenu ? 'show' : ''}`}>
            {conversations.length === 0 ? (
              <li className="no-conversations">No hay conversaciones</li>
            ) : (
              conversations.map((conv) => (
                <li key={conv.id}>
                  <span className="conversation-name">{conv.name}</span>
                  <div className="conversation-actions">
                    <button
                      className="action-btn feedback-btn"
                      onClick={handleFeedback}
                    >
                      <FaInfoCircle />
                    </button>
                    <button
                      className="action-btn rename-btn"
                      onClick={() => handleRenameConversation(conv.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteConversation(conv.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))
            )}
            <li className="add-conversation" onClick={addConversation}>
              <FaComments className="add-icon" />
              <span>Añadir conversación</span>
            </li>
          </ul>
        </div>

        {/* Menú de perfil */}
        <div className="profile-container">
          <FaUserCircle
            className="profile-icon"
            onClick={toggleMenu}
          />
          <ul className={`dropdown-menu ${showMenu ? 'show' : ''}`}>
            <li>
              <FaInfoCircle className="dropdown-icon" />
              <span>Acerca de</span>
            </li>
            <li>
              <FaCog className="dropdown-icon" />
              <span>Ajustes</span>
            </li>
            <li className="dropdown-divider"></li>
            <li onClick={handleLogout}>
              <FaSignOutAlt className="dropdown-icon" />
              <span>Cerrar sesión</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
