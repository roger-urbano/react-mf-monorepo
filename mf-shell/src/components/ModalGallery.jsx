// ModalGallery.jsx
import React from 'react';

export default function ModalGallery({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-3xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Bienvenido, {user}</h2>

        <input
          type="text"
          placeholder="Buscar Pokémon"
          className="w-full mb-6 px-4 py-2 border rounded-md bg-white text-black placeholder-gray-500 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400"
        />

        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-zinc-700 h-32 rounded-lg"
            ></div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
