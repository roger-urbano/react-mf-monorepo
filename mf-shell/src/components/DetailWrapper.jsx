import { useParams, useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const DetailPokemon = lazy(() => import('mfDetail/DetailPokemon'));

export default function DetailWrapper() {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <Suspense fallback={<p className="text-white">Cargando detalle...</p>}>
      <DetailPokemon name={name} onBack={() => navigate(-1)} navigate={navigate}/>
    </Suspense>
  );
}
