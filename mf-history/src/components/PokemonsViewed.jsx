import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

export default function PokemonsViewed() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('viewedPokemons')) || [];
    setPokemons(viewed);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-8 py-10 bg-slate-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors">
        <div className='p-4 space-y-4 w-full max-w-1/3'>
            <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-white">Pokémon Vistos</h2>
            {pokemons.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300">Aún no has visto ningún Pokémon.</p>
            ) : (
                pokemons.map((pokemon, index) => (
                <div
                    key={index}
                    className="relative flex items-center bg-white dark:bg-zinc-800 rounded-xl w-full max-w-md text-center  border-slate-400 p-4 shadow-md"
                >
                    <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-16 h-16 object-contain bg-white rounded-l-xl"
                    />
                    <div className="ml-6 text-left">
                    <p className="text-sm font-semibold capitalize px-3 py-1 bg-blue-100 text-blue-700 rounded-full  dark:bg-blue-800 dark:text-white">{pokemon.name}</p>
                    <p className="text-sm">Altura: {pokemon.height}</p>
                    <p className="text-sm">Peso: {pokemon.weight}</p>
                    <p className="text-sm">Tipo: {pokemon.types.join(', ')}</p>
                    </div>
                    <CheckCircleIcon className="h-8 w-8 text-indigo-600 dark:text-blue-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
                </div>
                ))
            )}
        </div>
    </div>
  );
}
