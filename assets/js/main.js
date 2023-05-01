const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
let offset = 0
const limit = 10

// 1, 2, 3, 4, 5   0 - 5
// 6, 7, 8, 9, 10  5 - 5
// 11,             10 - 5

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
          </li>
      `).join('')

    pokemonList.innerHTML += newHtml

    // const listItems = []

    // for(let i=0; i<pokemons.length; i++){
    //   const pokemon = pokemons[i]    
    //   listItems.push(convertPokemonToLi(pokemon))
    //   pokemonList.innerHTML += convertPokemonToLi(pokemon)
    // }
  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  // debugger
  const qtdRecordsWithNextPage = offset + limit
  
  if(qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)
    
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItems(offset, limit)
  }
  
})