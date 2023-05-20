const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
let offset = 0
const limit = 10

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
        <li id="pokemon" class="pokemon ${pokemon.type}" style="cursor:pointer" data-id='${pokemon.number}' data-type='${pokemon.type}'>
            <a id="a" class="a" href="#" style="text-decoration:none" onclick="details()"  id="pokeId">
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>
              <div class="detail">
                <ol class="types">
                  ${pokemon.types.map((type) => `<li class="pokemon type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
              </div>
            </a>
          </li>
      `).join('')

    pokemonList.innerHTML += newHtml
  })
}

function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}

function addTrailingZeros(num, totalLength) {
  return String(num).padEnd(totalLength, '0');
}

function loadModalDetails() {
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNextPage = offset + limit
  
  if(qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)
    
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItems(offset, limit)
  }
  
})

 function details() {
  var modal = document.getElementById("myModal");
  var link = document.querySelectorAll(".a");
  var span = document.getElementsByClassName("close")[0];

  var elements = document.querySelectorAll("li");
   elements.forEach(element => {
    element.addEventListener("click", async function(e) {
      var pokeId = element.getAttribute('data-id');
      var pokeType = element.getAttribute('data-type');
      var modalScreen = document.getElementById("modalBackgrond");
      var classColor = $('#modalBackgrond').attr('class').split(' ');
      modalScreen.classList.replace(classColor[1], pokeType)

      const pokeUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`);
      pokeInfo = await pokeUrl.json();

      const pokemonSpeciesUrl = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`);
      pokeSpeciesInfo = await pokemonSpeciesUrl.json();

      const modalInfo = document.getElementById('modalInfo')
      const infoHtml = `
        <p>${pokeInfo.name} ${'#'+padWithLeadingZeros(pokeInfo.id, 3)}</p>
        <img src="${pokeInfo.sprites.other.dream_world.front_default}">
        <p>${pokeInfo.types.map((type) => `<span class="modal-pokemon-type type ${type.type.name}">${type.type.name}</span>`).join('')} </p>
      `;
      
      const infoTabs = `
        <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="about-tab" data-bs-toggle="tab" data-bs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true">About</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="base-tab" data-bs-toggle="tab" data-bs-target="#base" type="button" role="tab" aria-controls="base" aria-selected="false">Base status</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
          <p><span class="description">Species</span> ${pokeSpeciesInfo.genera[7].genus}</p>
          <p><span class="description">Height</span> ${addTrailingZeros((pokeInfo.height/10), 4)+'cm'}</p>
          <p><span class="description">Weight</span> ${(pokeInfo.weight/10)} kg</p>
          <p><span class="description">Abilities</span> ${pokeInfo.abilities.map((type) => `${type.ability.name}`).join(', ')}</p>
          <h8>Bredding</h8>
          <p>
            <span class="description">Gender</span>
            <span class="material-symbols-outlined">female</span>12.6
            <span class="material-symbols-outlined">male</span>87.5
          </p>
          <p><span class="description">Egg Groups</span> ${pokeSpeciesInfo.egg_groups.map((type) => `${type.name}`).join(', ')}</p></p>
          <p><span class="description">Egg Cycle</span> ${pokeType}</p>
        </div>
        <div class="tab-pane fade" id="base" role="tabpanel" aria-labelledby="base-tab">
          <p>
            <div class="container">
              <div class="row"> 
                <span class="description">HP</span> &nbsp;&nbsp;&nbsp;
                <div class="progress" style="height: 20px; width: 200px;">
                    <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 45%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">45%</div>
                </div>
              </div>
            </div>
          </p>          
          <p>
          <div class="container">
              <div class="row"> 
                <span class="description">Attack</span> &nbsp;&nbsp;
                <div class="progress" style="height: 20px; width: 200px;">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 60%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">60%</div>
                </div>
              </div>
            </div>
          </p>
          <p>
            <div class="container">
              <div class="row"> 
                <span class="description">Defense</span> &nbsp;
                  <div class="progress" style="height: 20px; width: 200px;">
                      <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 48%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">48%</div>
                  </div>
              </div>
            </div>
          </p>
          <p>
            <div class="container">
              <div class="row"> 
                <span class="description">Sp. Atk</span> &nbsp;
                <div class="progress" style="height: 20px; width: 200px;">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 45%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">48%</div>
                </div>
              </div>
            </div>
          </p>
          <p>
            <div class="container">
              <div class="row">
                <span class="description">Sp. Def</span> &nbsp;
                <div class="progress" style="height: 20px; width: 200px;">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 45%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">48%</div>
                </div>
              </div>
            </div>
          </p>
          <p>
            <div class="container">
              <div class="row">
                <span class="description">Speed</span> &nbsp;
                <div class="progress" style="height: 20px; width: 200px;">
                    <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 45%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">45%</div>
                </div>
              </div>
            </div>
          </p>
          <p>
            <div class="container">
              <div class="row">
                <span class="description">Total</span> &nbsp;
                <div class="progress" style="height: 20px; width: 200px;">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 45%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">317</div>
                </div>
              </div>
            </div>
          </p>
          <h8>Type defenses</h8>
          <div>The effectiveness of each type on ${pokeInfo.name}</div>
        </div>
      </div>
      `;
      modalInfo.innerHTML = infoHtml+infoTabs;
  
    });
   });   

  for (let i = 0; i < link.length; i++) {
    link[i].onclick = function() {
      modal.style.display = "block";
    }
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}