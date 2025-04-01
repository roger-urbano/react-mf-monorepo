import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Gallery from './components/Gallery';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import DetailWrapper from './components/DetailWrapper';
import PokemonsViewedWrapper from './components/PokemonViewedWrapper';


const DetailPokemon = React.lazy(() => import('mfDetail/DetailPokemon'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pokemon/:name" element={<DetailWrapper />} />
          <Route path="/pokemon/viewed" element={<PokemonsViewedWrapper />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
