import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DetailPokemon from './components/DetailPokemon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DetailPokemon></DetailPokemon>
    </>
  )
}

export default App
