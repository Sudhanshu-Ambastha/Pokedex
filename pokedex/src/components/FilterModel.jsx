import { useState } from "react";

const FilterModal = ({ applyFilters, closeModal }) => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [formType, setFormType] = useState("all");
  const [megaEvolution, setMegaEvolution] = useState("all");
  const [gender, setGender] = useState("all");
  const [spriteType, setSpriteType] = useState("normal");
  const [megaType, setMegaType] = useState("regular");
  const [genderType, setGenderType] = useState("all");
  const [regionType, setRegionType] = useState("all");

  const handleApplyFilters = () => {
    applyFilters({ search, region, formType, megaEvolution, gender, spriteType, megaType, genderType, regionType });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:hidden">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-[PokeSolid] mb-4">Filters</h2>

        <div className="mb-4">
          <label htmlFor="spriteType" className="block text-gray-700 text-sm font-[PokeSolid] mb-2">Sprite Type</label>
          <select
            id="spriteType"
            value={spriteType}
            onChange={(e) => setSpriteType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="normal">Normal</option>
            <option value="shiny">Shiny</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="formType" className="block text-gray-700 text-sm font-[PokeSolid] mb-2">Form Type</label>
          <select
            id="formType"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="all">All</option>
            <option value="standard">Standard</option>
            <option value="alola">Alola</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="megaType" className="block text-gray-700 text-sm font-[PokeSolid] mb-2">Mega Type</label>
          <select
            id="megaType"
            value={megaType}
            onChange={(e) => setMegaType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="regular">Regular</option>
            <option value="mega">Mega</option>
            <option value="megax">Mega X</option>
            <option value="megay">Mega Y</option>
            <option value="primal">Primal</option>
            <option value="gmax">G-Max</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="genderType" className="block text-gray-700 text-sm font-[PokeSolid] mb-2">Gender Type</label>
          <select
            id="genderType"
            value={genderType}
            onChange={(e) => setGenderType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="regionType" className="block text-gray-700 text-sm font-[PokeSolid] mb-2">Region</label>
          <select
            id="regionType"
            value={regionType}
            onChange={(e) => setRegionType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="all">All</option>
            <option value="kanto">Kanto</option>
            <option value="johto">Johto</option>
            <option value="hoenn">Hoenn</option>
            <option value="sinnoh">Sinnoh</option>
            <option value="unova">Unova</option>
            <option value="kalos">Kalos</option>
            <option value="alola">Alola</option>
            <option value="galar">Galar</option>
            <option value="paldea">Paldea</option>
          </select>
        </div>

        <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleApplyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default FilterModal;