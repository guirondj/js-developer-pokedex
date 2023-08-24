const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords= 151
const limit = 1
let offset = 0

function loadPokemonItens(offset , limit){

    pokeApi.getPokemons(offset , limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon)=>`
        <li class="pokemon ${pokemon.type} ">
        <span class="number"> # ${pokemon.number} </span>
        <span class="nome"> ${pokemon.name} </span>
        <div class="detail ">
            <ol class="types">
            ${pokemon.types.map((type) => ` <li class="type ${type}">${type}</li>`).join('')}   
        
            </ol>
            <img src=" ${pokemon.photo} " alt="${pokemon.name}">

        </div>

        <button class="abl" id="habilidadesPoke" onclick="loadHabilidades()" >habilidades</button>       

        </li>
    `
    ).join('')

    pokemonList.innerHTML += newHtml

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
       loadPokemonItens(offset, limit) 
    }
    
})

const habilidadesButton = document.getElementById('habilidadesPoke')

function loadHabilidades(){

    pokeApi.getPokemons(offset , limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon)=>`
        ${pokemon.habilidades.map((ability) => ` <li class="type">${ability}</li>`).join('')}
    `
    ).join('')

    pokemonList.innerHTML += newHtml

    })
}
   
   //${pokemon.habilidades.map((ability) => ` <li class="type ${ability}">${ability}</li>`).join('')}
