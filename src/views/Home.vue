<template>
  <div id="container">
    <h1>Hello There!</h1>
    <h3>
      Welcome to my small corner of the internet.<br />Use the buttons below to
      navigate this site, <br />
      you can also use the Navbar at the top of the screen
    </h3>
    <h3></h3>
    <div class="flex-container">
      <div class="flex-child">
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
      <div class="flex-child">
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
@media (min-width: 768px) {
  .flex-container {
    display: flex;
    max-width: 720px;
  }
}
.flex-child {
  flex: 1;
  border: 2px;
}

.flex-child:first-child {
  margin-right: 20px;
}

#container {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  box-shadow: 2px 2px 5px 2px rgb(175, 176, 202);
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
}
#btn-grid {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin: 8px;
  padding: 4px;
}
body {
  text-align: center;
  font-family: Arial;
  background-image: url("/src/assets/images/background.jpg");
}

button {
  background-color: #3399ff;
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 5px;
  margin: 10px;
  font-size: 15px;
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
