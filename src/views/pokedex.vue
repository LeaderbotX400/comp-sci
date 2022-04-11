<template>
  <div id="header-container" class="ui inverted segment">
    <div class="ui inverted secondary menu">
      <h1 id="header-text">Kanto Pokemon</h1>
    </div>
  </div>
  <div id="container">
    <div class="ui cards" v-if="!isHidden">
      <button
        id="generate-pokemon"
        class="ui secondary button"
        v-on:click="renderEverything"
      >
        Generate Pokemon
      </button>
    </div>

    <div id="poke-container" class="ui cards"></div>
  </div>
  <div id="delete-container" v-if="isHidden">
    <button id="delete-btn" class="ui red button" v-on:click="deleteEverything">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    document.body.className = "pokedex";
  },
  data() {
    return {
      isHidden: false,
    };
  },
  methods: {
    renderEverything() {
      this.isHidden = !this.isHidden;
      let allPokemonContainer = document.querySelector("#poke-container");
      allPokemonContainer.innerText = "";
      this.fetchKantoPokemon();
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

    deleteEverything() {
      this.isHidden = !this.isHidden;
      let allPokemonContainer = document.querySelector("#poke-container");
      allPokemonContainer.innerText = "";
    },
  },
  mounted() {
    console.log("You have connected...");
    let link = document.querySelector("link[rel~='icon']");
    link.href = "/favicons/pokemon.ico";
    document.title = "Pokedex";
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css");
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
  margin-bottom: 5%;
}
#generate-container {
  margin: auto;
  width: 90%;
  padding: 10px;
}
</style>
