import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function DetailPokemon({ name, onBack, navigate }) {

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!name) {
    return <p className="text-center mt-6">Cargando nombre del Pokémon...</p>;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);

        const viewed = JSON.parse(localStorage.getItem('viewedPokemons')) || [];
        const exists = viewed.some(p => p.name === res.data.name);

        if (!exists) {
          const newEntry = {
            name: res.data.name,
            image: res.data.sprites.other.dream_world.front_default || res.data.sprites.front_default,
            height: res.data.height,
            weight: res.data.weight,
            types: res.data.types.map(t => t.type.name)
          };
          const updated = [newEntry, ...viewed.slice(0, 19)];
          localStorage.setItem('viewedPokemons', JSON.stringify(updated));
        }
      } catch (err) {
        console.error('Error cargando Pokémon:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [name]);

  const handleViewHistory = () => {
    navigate('/pokemon/viewed');
  };

  if (loading) return <p className="text-center mt-10">Cargando detalles...</p>;
  if (!pokemon) return <p className="text-center mt-10">Pokémon no encontrado.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200 dark:bg-zinc-900 text-zinc-900 dark:text-white px-4 py-8">
      {onBack && (
          <div className="w-full max-w-md flex justify-start mb-6">
          <button 
            onClick={onBack}
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="sr-only">Volver</span>
          </button>
        </div>
        )}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-md text-center border-4 border-slate-400 dark:border-blue-400">
        <img
          src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h1>
        <p className="text-sm mb-4">Altura: {pokemon.height} | Peso: {pokemon.weight}</p>
        <div>
          <h2 className="font-semibold mb-2">Tipo:</h2>
          <ul className="flex justify-center gap-2">
            {pokemon.types.map((type, idx) => (
              <li key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs dark:bg-blue-800 dark:text-white">
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        
      </div>
        <button
          onClick={handleViewHistory}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Ver historial
        </button>
    </div>
  );
}
