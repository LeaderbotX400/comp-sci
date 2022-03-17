<template>
  <!-- The navigation menu -->
  <div class="navbar">
    <a href="/"><i class="fas fa-home"></i> Home</a>
    <!-- Games -->
    <div class="subnav">
      <button class="subnavbtn">
        <i class="fas fa-gamepad"></i> Games <i class="fa fa-caret-down"></i>
      </button>
      <div class="subnav-content">
        <a href="/projects/games/pokemon">Pokemon simulator</a>
        <a href="/projects/games/dragon">RNG Dragon</a>
        <a href="/projects/games/2048">2048</a>
      </div>
    </div>
    <!-- API based applications -->
    <div class="subnav">
      <button class="subnavbtn">
        <i class="fas fa-terminal"></i> Api(s) <i class="fa fa-caret-down"></i>
      </button>
      <div class="subnav-content">
        <a href="/projects/fetch/pokedex/">Pokedex</a>
        <a href="/projects/fetch/weather/">Weather</a>
      </div>
    </div>
  </div>
</template>

<style>
/* The navigation menu */
.navbar {
  overflow: hidden;
  background-color: #333;
}

/* Navigation links */
.navbar a {
  font-family: Arial;
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The subnavigation menu */
.subnav {
  float: left;
  overflow: hidden;
}

/* Subnav button */
.subnav .subnavbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

/* Add a skyblue background color to navigation links on hover */
.navbar a:hover,
.subnav:hover .subnavbtn {
  background-color: skyblue;
}

/* Style the subnav content - positioned absolute */
.subnav-content {
  display: none;
  position: absolute;
  left: 0;
  background-color: skyblue;
  width: 100%;
  z-index: 1;
}

/* Style the subnav links */
.subnav-content a {
  float: left;
  color: black;
  text-decoration: none;
}

/* Add a grey background color on hover */
.subnav-content a:hover {
  background-color: #eee;
  color: black;
}

/* When you move the mouse over the subnav container, open the subnav content */
.subnav:hover .subnav-content {
  display: block;
}
</style>
