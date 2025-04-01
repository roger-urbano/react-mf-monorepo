import { useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const PokemonsViewed = lazy(() => import('mfHistory/PokemonsViewed'));

export default function PokemonsViewedWrapper() {
  const navigate = useNavigate();

  return (
    <Suspense fallback={<p className="text-white">Cargando historial...</p>}>
      <PokemonsViewed onBack={() => navigate(-1)} />
    </Suspense>
  );
}
