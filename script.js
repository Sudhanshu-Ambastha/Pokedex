const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const spriteType = document.getElementById("spriteType");
const formType = document.getElementById("formType");
const megaType = document.getElementById("megaType");
const genderType = document.getElementById("genderType");

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await response.json();

    // Set Pokémon info
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    // Set Pokémon sprite
    let spriteUrl;
    const form = formType.value === 'alola' ? '-alola' : '';
    const gender = genderType.value === 'female' ? '-f' : '';
    const mega = megaType.value === 'mega' ? '-mega' : '';
    
    spriteUrl = `https://projectpokemon.org/images/${spriteType.value}-sprite/${data.name}${form}${mega}${gender}.gif`;
    spriteContainer.innerHTML = `<img id="sprite" src="${spriteUrl}" alt="${data.name} sprite">`;

    // Set stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Display types
    types.innerHTML = data.types
      .map(
        (typeInfo) =>
          `<span class="type">${typeInfo.type.name.toUpperCase()}</span>`
      )
      .join("");
  } catch (error) {
    alert("Pokémon not found!");
  }
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getPokemon();
});
