import { Routes, Route } from 'react-router-dom';
import { Welcome, Grid, PokeData, Evol, Error } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/Pokedex" element={<Welcome />} />
      <Route path="/Pokedex/Grid" element={<Grid />} />
      <Route path="/Pokedex/pokedata/:pokemonId/:formName" element={<PokeData />} />
      <Route path="/Pokedex/Evol/:pokemonName/:formName" element={<Evol />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;