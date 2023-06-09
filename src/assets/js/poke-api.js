const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types  // destructuring, pokemon.type = pokemon.types.get(0)
  
  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
 return fetch(pokemon.url)
              .then((response) => response.json())
              .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=146, limit=5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    // .catch((error) => console.log(error))
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

$(document).on("click", "#about-tab", function(){
  $('#base-tab').removeClass('active');
  $('#evolution-tab').removeClass('active');
  $('#about-tab').addClass('active');

  $('#base').removeClass('active');
  $('#base').removeClass('show');
  $('#evolution').removeClass('active');
  $('#evolution').removeClass('show');
  $('#about').addClass('active');
  $('#about').addClass('show');
});

$(document).on("click", "#base-tab", function(){
  $('#about-tab').removeClass('active');
  $('#evolution-tab').removeClass('active');
  $('#base-tab').addClass('active');

  $('#base').addClass('active');
  $('#base').addClass('show');
  $('#evolution').removeClass('active');
  $('#evolution').removeClass('show');
  $('#about').removeClass('active');
  $('#about').removeClass('show');
});

$(document).on("click", "#evolution-tab", function(){
  $('#about-tab').removeClass('active');
  $('#base-tab').removeClass('active');
  $('#evolution-tab').addClass('active');

  $('#base').removeClass('active');
  $('#base').removeClass('show');
  $('#evolution').addClass('active');
  $('#evolution').addClass('show');
  $('#about').removeClass('active');
  $('#about').removeClass('show');
});
