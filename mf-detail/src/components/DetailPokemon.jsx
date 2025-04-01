import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailPokemon({ name = 'pikachu' }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        setPokemon(response.data);
        setError(null);
      } catch (err) {
        setError('Pokémon no encontrado');
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return <p className="text-white text-center">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-lg p-6 transition-colors">
        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40 object-contain mb-4"
          />
          <h2 className="text-2xl font-bold capitalize text-gray-800 dark:text-white mb-2">
            {pokemon.name}
          </h2>
          <div className="text-sm text-gray-700 dark:text-zinc-300 space-y-1 text-center">
            <p><span className="font-semibold">Altura:</span> {pokemon.height / 10} m</p>
            <p><span className="font-semibold">Peso:</span> {pokemon.weight / 10} kg</p>
            <p><span className="font-semibold">Tipo:</span> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
