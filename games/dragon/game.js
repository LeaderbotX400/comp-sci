//formating
document.body.setAttribute("style","background-image: url(dragon.jpg)");
//actual logic
let btn = document.createElement("button");
btn.innerHTML = "Click Me";
btn.setAttribute("class", "center")
btn.onclick = function game() {
    alert(
        "You are in a land full of dragons. In front of you, you see two caves. In one cave, the dragon is friendly and will share his treasure with you. The other dragon is greedy and hungry, and will eat you on sight.");
    var caveInput = prompt("Which cave will you go into? (1 or 2)");
    var rng = Math.floor(Math.random() * 2) + 1;
    if (caveInput == 1 || caveInput == 2) {
        if (caveInput == rng) {
            alert("You approach the cave…");
            alert("It is dark and spooky…");
            alert("A large dragon jumps out in front of you! He opens his jaws and...");
            alert("Gives you a treasure \nDo you want to play again? (just click the button again)")
        } else {
            alert("You approach the cave…");
            alert("It is dark and spooky…");
            alert("A large dragon jumps out in front of you! He opens his jaws and...");
            alert(
                "Gobbles you down in one bite! \nDo you want to play again? (just click the button again)");
        }
    } else {
        alert("Not a valid input please click the button again");
    }
}
document.body.appendChild(btn);
