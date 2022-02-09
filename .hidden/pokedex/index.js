let url = 'pokemon.json';
let dex;
$.ajax({
  type: 'GET',
  url: url,
  dataType: 'json',
  success: function(data) { dex = data;},
  async: false
});

console.log(dex)

//generate new item
async function generate(name, num) {
  let list = document.getElementById("list");
  let listItem = document.createElement("li");

  let pokemonName = document.createElement("h3");
  pokemonName.innerHTML = `Name: ${name}`;

  let number = document.createElement("h4");
  number.innerHTML = `Entry Number: ${num}`;

  let img = document.createElement("img");
  img.src = "";

  list.appendChild(listItem);
  list.appendChild(pokemonName);
  list.appendChild(number);
  list.appendChild(img);
}

//loop through dex
for (let i = 0; i < dex.length; i++) {
  generate(dex[i].name, dex[i].national);
}
