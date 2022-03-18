<template>
<div id="container">
  <button @click="game()" v-if="isHidden">{{ start }}</button>
  <div class="container" v-if="!isHidden">
    <div>
      <div id="text">{{ text }}</div>
      <div id="options" class="btn-grid">
        <button v-if="!hideOptions" @click="checkCave(1)">{{ btn1 }}</button>
        <button v-if="!hideOptions" @click="checkCave(2)">{{ btn2 }}</button>
        <button @click="game()" v-if="!hideRestart">{{ start }}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
document.title = 'RNG Dragon'
export default({
  data() {
    return {
      hideRestart: false,
      isHidden: true,
      hideOptions: true,
      start: "Click Me!",
      text: "Place Holder",
      btn1: "Option 1",
      btn2: "Option 2",
    };
  },
  methods: {
    game() {
      console.log("hello");
      this.hideRestart = true;
      this.isHidden = false;
      this.text =
        "You are in a land full of dragons. In front of you, you see two caves. In one cave, the dragon is friendly and will share his treasure with you. The other dragon is greedy and hungry, and will eat you on sight.";
      setTimeout(() => {
        this.text = "Which cave will you go into?";
        this.hideOptions = false;
        this.btn1 = "Cave 1";
        this.btn2 = "Cave 2";
      }, 5000);
    },
    checkCave(input) {
      let rng = Math.floor(Math.random() * 2) + 1;
      this.text = `You approach the cave…
        \nIt is dark and spooky…
        \nA large dragon jumps out in front of you! He opens his jaws and...`;

      setTimeout(() => {
        if (input == rng) {
          this.text = `${this.text} \nGives you a treasure`;
        } else {
          this.text = `${this.text} \nGobbles you down in one bite!`;
        }
        this.hideOptions = true;
        this.hideRestart = false;
        this.start = "Play again";
      }, 2000);
    },
  },
})
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: Gotham Rounded;
}

body {
  background-image: url("./dragon.jpg");
}

#container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 99vw;
  height: 90vh;
}

.container {
  position: relative;
  width: 800px;
  max-width: 80%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px;
}

.btn-grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
  margin-top: 20px;
}

button.start {
  position: relative;
  top: 50%;
  left: 38%;
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