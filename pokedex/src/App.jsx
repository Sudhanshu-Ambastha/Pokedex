import { Routes, Route } from 'react-router-dom';
import { Welcome, Grid, PokeData, Evol, Error } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/Grid" element={<Grid />} />
      <Route path="/pokedata/:pokemonId/:formName" element={<PokeData />} />
      <Route path="/Evol/:pokemonName/:formName" element={<Evol />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;