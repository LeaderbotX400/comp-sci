<template>
  <div class="grid">
    <div id="container">
      <h1>Hello There!</h1>
      <h3>
        Welcome to my small corner of the internet.<br />Use the buttons below
        to navigate this site, <br />
        you can also use the Navbar at the top of the screen
      </h3>
      <div class="grid">
        <div class="flex-container">
          <div id="games" class="flex-child">
            <h3>Games</h3>
            <div id="btn-grid">
              <router-link to="/games/dragon">
                <button>RNG Dragon</button>
              </router-link>
              <a href="/games/pokemon/index.html"
                ><button>Pokemon Simulator</button></a
              >
            </div>
          </div>
          <div id="firebase" class="flex-child">
            <h3>Firebase</h3>
            <div id="btn-grid">
              <router-link to="/firebase/todo">
                <button>To-Do App</button>
              </router-link>
              <router-link to="/firebase/chat">
                <button>Chat App</button>
              </router-link>
            </div>
          </div>
          <div id="apis" class="flex-child">
            <h3>API based applications</h3>
            <div id="btn-grid">
              <router-link to="/fetch/pokedex">
                <button>Pokedex</button>
              </router-link>
              <router-link to="/fetch/weather">
                <button>Weather</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    document.body.className = "home";
  },
  mounted() {
    let link = document.querySelector("link[rel~='icon']");
    link.href = "/favicons/favicon.ico";
    document.title = "Computer Science";
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  place-items: center;
  margin-top: 20px;
}
@media (min-width: 768px) {
  .flex-container {
    display: flex;
    overflow-x: auto;
    justify-content: space-between;
  }
}
.flex-child {
  flex: 1;
  border: 2px;
}

#container {
  max-width: fit-content;
  box-shadow: 2px 2px 5px 2px rgb(175, 176, 202);
  background-color: white;
  border-radius: 10px;
}
#btn-grid {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  padding: 4px;
}

button {
  background-color: #3399ff;
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 5px;
  margin: 10px;
  font-size: 14px;
  width: 200px;
  outline: none;
  box-shadow: 2px 2px 5px 2px rgb(201, 202, 230);
}

button.center {
  position: absolute;
  top: 50%;
  left: 50%;
}

button:hover {
  -moz-box-shadow: inset 0 0 100px 100px skyblue;
  -webkit-box-shadow: inset 0 0 100px 100px skyblue;
  box-shadow: inset 0 0 100px 100px skyblue;
}
</style>
