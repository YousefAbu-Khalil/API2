async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      const data = await response.json();
      displayPokemon(data);
    } catch (error) {
      document.getElementById('pokemon-info').innerHTML = `<p>${error.message}</p>`;
    }
  }
  
  function displayPokemon(pokemon) {
    const pokemonInfo = document.getElementById('pokemon-info');
    pokemonInfo.innerHTML = `
      
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      
    `;
  }
  