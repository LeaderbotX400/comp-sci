<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
  />
  <div id="header-container" class="ui inverted segment">
    <div class="ui inverted secondary menu">
      <h1 id="header-text">Kanto Pokemon</h1>
    </div>
  </div>
  <div id="container">
    <div id="poke-container" class="ui cards">
      <button id="generate-pokemon" class="ui secondary button">
        Generate Pokemon
      </button>
    </div>
  </div>
  <div id="delete-container">
    <button id="delete-btn" class="ui red button">Delete</button>
  </div>
</template>

<script>
export default {
  methods: {
    renderEverything() {
      let allPokemonContainer = document.querySelector("#poke-container");
      allPokemonContainer.innerText = "";
      this.fetchKantoPokemon();

      this.getDeleteBtn().style.display = "block";
    },

    getDeleteBtn() {
      return document.querySelector("#delete-btn");
    },

    fetchKantoPokemon() {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((allpokemon) => {
          allpokemon.results.forEach((pokemon) => {
            this.fetchPokemonData(pokemon);
          });
        });
    },

    fetchPokemonData(pokemon) {
      let url = pokemon.url;
      fetch(url)
        .then((response) => response.json())
        .then((pokeData) => {
          this.renderPokemon(pokeData);
        });
    },

    renderPokemon(pokeData) {
      let allPokemonContainer = document.getElementById("poke-container");
      let pokeContainer = document.createElement("div");
      pokeContainer.classList.add("ui", "card");

      this.createPokeImage(pokeData.id, pokeContainer);

      let pokeName = document.createElement("h4");
      pokeName.innerText = pokeData.name;

      let pokeNumber = document.createElement("p");
      pokeNumber.innerText = `#${pokeData.id}`;

      let pokeTypes = document.createElement("ul");

      this.createTypes(pokeData.types, pokeTypes);

      pokeContainer.append(pokeName, pokeNumber, pokeTypes);
      allPokemonContainer.appendChild(pokeContainer);
    },

    createTypes(types, ul) {
      types.forEach((type) => {
        let typeLi = document.createElement("li");
        typeLi.innerText = type["type"]["name"];
        ul.append(typeLi);
      });
    },

    createPokeImage(pokeID, containerDiv) {
      let pokeImgContainer = document.createElement("div");
      pokeImgContainer.classList.add("image");

      let pokeImage = document.createElement("img");
      pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`;

      pokeImgContainer.append(pokeImage);
      containerDiv.append(pokeImgContainer);
    },

    deleteEverything(e) {
      e.target.style = "none";
      let allPokemonContainer = document.querySelector("#poke-container");
      allPokemonContainer.innerText = "";

      let generateBtn = document.createElement("button");
      generateBtn.innerText = "Generate Pokemon";
      generateBtn.id = "generate-pokemon";
      generateBtn.classList.add("ui", "secondary", "button");
      generateBtn.addEventListener("click", this.renderEverything);

      allPokemonContainer.append(generateBtn);
    },
  },
  mounted() {
    console.log("You have connected...");
    let link = document.querySelector("link[rel~='icon']");
    link.href = "/pokedex.ico";
    document.title = "Pokedex";

    document.addEventListener("DOMContentLoaded", () => {
      let generateBtn = document.querySelector("#generate-pokemon");
      generateBtn.addEventListener("click", this.renderEverything);

      this.getDeleteBtn().addEventListener("click", this.deleteEverything);
    });
  },
};
</script>

<style>
#container {
  margin: auto;
}

#poke-container {
  margin: auto;
  width: 90%;
  padding: 10px;
}

#header-container {
  border-radius: 0px !important;
}

#header-text {
  margin: 0 auto;
}

#generate-pokemon {
  margin: 0 auto;
}

#delete-btn {
  position: absolute;
  left: 85%;
  display: none;
  margin-bottom: 5%;
}
</style>
