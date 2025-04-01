import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ModalGallery from './ModalGallery';
import axios from 'axios';
import ThemeSwitch from './ThemeSwitch';

const categories = [
  { name: 'Fuego', url: 'https://pokeapi.co/api/v2/type/fire/' },
  { name: 'Agua', url: 'https://pokeapi.co/api/v2/type/water/' },
  { name: 'Eléctrico', url: 'https://pokeapi.co/api/v2/type/electric/' },
  { name: 'Dragón', url: 'https://pokeapi.co/api/v2/type/dragon/' },
  { name: 'Fantasma', url: 'https://pokeapi.co/api/v2/type/ghost/' },
];

export default function Gallery() {
  const location = useLocation();
  const user = location.state?.user || 'Invitado';
  const [showModal, setShowModal] = useState(false);
  const [pokemonByType, setPokemonByType] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      const data = {};
      for (const category of categories) {
        try {
          const res = await axios.get(category.url);
          const pokemons = res.data.pokemon.slice(0, 10);

          const details = await Promise.all(
            pokemons.map(async (p) => {
              const pokeId = p.pokemon.url.split('/').filter(Boolean).pop();
              const detail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
              return {
                name: detail.data.name,
                image: detail.data.sprites.other.dream_world.front_default || detail.data.sprites.front_default,
              };
            })
          );

          data[category.name] = details;
        } catch (err) {
          console.error(`Error cargando ${category.name}:`, err);
        }
      }
      setPokemonByType(data);
    }

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-8 py-10 bg-slate-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors">
        <ThemeSwitch />
      <h2 className="text-3xl font-bold mb-4">Bienvenido, {user}</h2>

      <button
        onClick={() => setShowModal(true)}
        className="mb-8 w-full max-w-md px-4 py-2 border rounded-md bg-white text-left text-black placeholder-gray-500 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400"
      >
        Buscar Pokémon...
      </button>

      <div className="w-full max-w-7xl space-y-12">
        {Object.entries(pokemonByType).map(([type, pokemons]) => (
          <div key={type}>
            <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-blue-300">{type}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {pokemons.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-700 rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <p className="capitalize text-sm text-black dark:text-white">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalGallery
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
