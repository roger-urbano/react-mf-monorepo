// AuthForm.jsx
import React, { useState } from 'react';
import ModalGallery from './ModalGallery';

export default function AuthForm() {
  const [user, setUser] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.trim()) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setUser('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white text-black placeholder-gray-500 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!user.trim()}
          className={`font-semibold py-2 px-4 rounded transition-colors
            ${user.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-400 cursor-not-allowed text-white'}`}
        >
          Registrarse
        </button>
      </form>

      {showModal && <ModalGallery user={user} onClose={closeModal} />}

    </>
  );
}
