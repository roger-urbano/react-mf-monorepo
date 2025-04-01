import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/solid';

const DetailPokemon = lazy(async () => import('mfDetail/DetailPokemon'));

export default function ModalGallery({ user, onClose }) {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const fetchDefaultPokemons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`);
      const results = res.data.results;

      const detailed = await Promise.all(
        results.map(async (p) => {
          const detail = await axios.get(p.url);
          return {
            name: detail.data.name,
            image: detail.data.sprites.other.dream_world.front_default || detail.data.sprites.front_default,
          };
        })
      );

      setPokemons((prev) => [...prev, ...detailed]);
      setOffset((prev) => prev + 30);
      setHasMore(res.data.next !== null);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchSearchedPokemon = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      const result = {
        name: res.data.name,
        image: res.data.sprites.other.dream_world.front_default || res.data.sprites.front_default,
      };
      setPokemons([result]);
      setHasMore(false);
    } catch (err) {
      setPokemons([]);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!search.trim()) {
      setPokemons([]);
      setOffset(0);
      setHasMore(true);
      fetchDefaultPokemons();
    } else {
      const delayDebounce = setTimeout(() => {
        fetchSearchedPokemon(search);
      }, 400);

      return () => clearTimeout(delayDebounce);
    }
  }, [search]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || loading || !hasMore || search.trim()) return;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 50) {
      fetchDefaultPokemons();
    }
  };

  const handleSelect = (pokemon) => {
    navigate(`/pokemon/${pokemon}`);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative pt-[70px] bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-3xl shadow-lg text-center max-h-[90vh] overflow-y-auto"
      >
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button> */}
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md bg-white text-black placeholder-gray-500 dark:bg-zinc-700 dark:text-gray-400 dark:placeholder-gray-400"
        />

        <div className="grid grid-cols-2 gap-4">
          {pokemons.map((poke, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-zinc-700 h-32 rounded-lg cursor-pointer flex flex-col items-center justify-center p-2"
              onClick={() => handleSelect(poke.name)}
            >
              <img src={poke.image} alt={poke.name} className="w-16 h-16 object-contain mb-2" />
              <p className="text-sm text-black dark:text-white">{poke.name}</p>
            </div>
          ))}
        </div>

        {loading && <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">Cargando...</p>}

        {selectedPokemon && (
          <div className="mt-6">
            <Suspense fallback={<p className="text-white">Cargando detalle...</p>}>
              <DetailPokemon name={selectedPokemon} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}