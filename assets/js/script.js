let player = {
  HP: 100,
  MP: 100,
  attackPower: 6,
  maxHP: 100,
  magicPower: 8,
  defence: 6,
  maxMP: 1000,
}

let dragon = {
  HP: 130,
  MP: 70,
  attackPower: 10,
  maxHP: 130,
  magicPower: 7,
  defence: 7,
}

let vampire = {
HP: 150,
MP: 30,
attackPower: 7,
maxHP: 150,
magicPower: 9,
defence: 5,
}

let demon = {
HP: 170,
MP: 70,
attackPower: 10,
maxHP: 130,
magicPower: 10,
defence: 8,
}

let alive = {
dragon: true,
vampire: true,
demon: true,
}

let monster = dragon;
let monsterName = "Dragon"
let username;
let potion = 3;

const playButton = document.getElementById('playButton');
const music = document.getElementById('music');

let attackButton = document.getElementById('attackButton');
attackButton.addEventListener('click', attack);

let magicButton = document.getElementById('magicButton');
magicButton.addEventListener('click', magicAttack);

let potionButton = document.getElementById('potionButton');
potionButton.addEventListener('click', takePotion);

let easy = document.getElementById('easy-mode');
easy.addEventListener('click', easyMode);

let normal = document.getElementById('normal-mode');
normal.addEventListener('click', normalMode);

let hard = document.getElementById('hard-mode');
hard.addEventListener('click', hardMode);


/**
 * This is the player attack. It uses player stats and an element of randomness to determine the damage.
 */
function attack () {
  buttonsToggle();
  let attackDamage = Math.floor(Math.random() * 10 + 1) + player.attackPower - monster.defence;
  if (Math.floor(Math.random() * 10 < 2)) {
      document.getElementById("content").innerHTML = ("you missed!")
      attackDamage = 0;
  } else {
      monster.HP = monster.HP - attackDamage;
  }
  document.getElementById("content").innerHTML = (`${attackDamage} Attack damage done to enemy, ${monster.HP} HP remains. <br><img src="assets/images/attack.png" alt="Attack">`);
  document.getElementById("player-stats").innerHTML = "";
  document.getElementById("enemy-stats").innerHTML = "";
  for (let stats in player) {
      document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
    }
    for (let stats in monster) {
      document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
    }
  if (monster.HP <= 0 ) {
      victory();
  } else {
  monsterAttack();
  }
}

/**
 * This is a check to see what the monster is, and call the appropriate function.
 */
function monsterAttack() {
  switch (monsterName) {
    case "Vampire":
      vampireAttack();
      break;
      case "Demon":
        demonAttack();
      break;
    default:
      dragonAttack();
      break;
  }
}

/**
 * This is the dragon attack pattern.
 */
function dragonAttack() {
  setTimeout(() => {
    let attackDamage = Math.floor(Math.random() * 10) + monster.attackPower;
    let attackType = Math.floor(Math.random() * 3);
    if (Math.floor(Math.random() * 10 < 2)) {
      document.getElementById("content").innerHTML = "Enemy missed!";
      attackDamage = 0;
    } else {
      if (attackType === 0) {
        document.getElementById("content").innerHTML = "Dragon breathes fire!";
        attackDamage = attackDamage + 20;
      } else if (attackType === 1 && monster.MP >= 10) {
        document.getElementById("content").innerHTML = `Dragon casts magic!`;
        document.getElementById("content").innerHTML += `<br><img src="assets/images/magic.png" alt="Magic">`;
        attackDamage = attackDamage + 15;
        monster.MP = monster.MP - 10;
      } else {
        document.getElementById("content").innerHTML = "Dragon attacks!";
      }
      player.HP = player.HP - (attackDamage - player.defence);
      document.getElementById("player-stats").innerHTML = "";
      document.getElementById("enemy-stats").innerHTML = "";
      for (let stats in player) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
      }
      for (let stats in monster) {
        document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
      }
    }
    if (player.HP <= 0) {
      gameOver();
    } else {
      setTimeout(() => {
        document.getElementById("content").innerHTML = `${attackDamage} damage done to player, ${player.HP} HP remains.`;
        buttonsToggle();
      }, 3000);
    }
  }, 3000);
}

/**
 * This is the vampire attack pattern.
 */
function vampireAttack() {
  setTimeout(() => {
    let attackDamage = Math.floor(Math.random() * 10) + monster.attackPower;
    let attackType = Math.floor(Math.random() * 3);

    if (Math.floor(Math.random() * 10 < 2)) {
      document.getElementById("content").innerHTML = "Enemy missed!";
      attackDamage = 0;
    } else {
      if (attackType === 0) {
        attackDamage = attackDamage + 10;
        monster.HP += attackDamage;
        document.getElementById("content").innerHTML = `Vampire drinks your blood, and regains ${attackDamage} points of health!`;
        document.getElementById("content").innerHTML += `<br><img src="assets/images/blood.png" alt="Magic">`;
      } else if (attackType === 1 && monster.MP >= 10) {
        document.getElementById("content").innerHTML = `Vampire casts magic!`;
        document.getElementById("content").innerHTML += `<br><img src="assets/images/magic.png" alt="Magic">`;
        attackDamage = attackDamage + 15;
        monster.MP = monster.MP - 10;
      } else {
        document.getElementById("content").innerHTML = "Vampire attacks!";
        document.getElementById("content").innerHTML += `<br><img src="assets/images/monsterAttack.png" alt="Attack">`;

      }
      player.HP = player.HP - (attackDamage - player.defence);
      document.getElementById("player-stats").innerHTML = "";
      document.getElementById("enemy-stats").innerHTML = "";
      for (let stats in player) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
      }
      for (let stats in monster) {
        document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
      }
    }

    if (player.HP <= 0) {
      gameOver();
    } else {
      setTimeout(() => {
        document.getElementById("content").innerHTML = `${attackDamage} damage done to player, ${player.HP} HP remains.`;
        buttonsToggle();;
      }, 3000);
    }
  }, 3000);
}

/**
 * This is the demon attack pattern.
 */
function demonAttack() {
  setTimeout(() => {
    let attackDamage = Math.floor(Math.random() * 10) + monster.attackPower;
    let attackType = Math.floor(Math.random() * 3);

    if (Math.floor(Math.random() * 10 < 2)) {
      document.getElementById("content").innerHTML = "Enemy missed!";
      document.getElementById("content").innerHTML += `<br><img src="assets/images/monsterAttack.png" alt="Attack">`;
      attackDamage = 0;
    } else {
      if (attackType === 0) {
        document.getElementById("content").innerHTML = "Demon uses hellfire!";
        document.getElementById("content").innerHTML += `<br><img src="assets/images/fire.png" alt="Fire">`;
        attackDamage = attackDamage + 20;
      } else if (attackType === 1 && monster.MP >= 10) {
        document.getElementById("content").innerHTML = `Demon casts magic!`;
        document.getElementById("content").innerHTML += `<br><img src="assets/images/magic.png" alt="Magic">`;
        attackDamage = attackDamage + 15;
        monster.MP = monster.MP - 10;
      } else {
        document.getElementById("content").innerHTML = "Demon attacks!";
      }
      player.HP = player.HP - (attackDamage - player.defence);
      document.getElementById("player-stats").innerHTML = "";
      document.getElementById("enemy-stats").innerHTML = "";
      for (let stats in player) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
      }
      for (let stats in monster) {
        document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
      }
    }

    if (player.HP <= 0) {
      gameOver();
    } else {
      setTimeout(() => {
        document.getElementById("content").innerHTML = `${attackDamage} damage done to player, ${player.HP} HP remains.`;
        buttonsToggle();
      }, 3000);
    }
  }, 3000);
}
/**
 * This is the function that is called when the player casts magic. It will check for available MP and then damage is based on the players magic power plus an element of randomness.
 */
function magicAttack () {
  buttonsToggle();
  if (player.MP <= 0) {
      document.getElementById("content").innerHTML = ('You have mo magic power left!')
  } else {
  let attackDamage = Math.floor(Math.random() * 10 + 1) + player.magicPower;
  if (Math.floor(Math.random() * 10 < 2)) {
      document.getElementById("content").innerHTML = ("Critical hit!");
      attackDamage = attackDamage + 20;
      monster.HP = monster.HP - attackDamage;
  } else {
      monster.HP = monster.HP - attackDamage;
  }
  player.MP = player.MP - 10;
    document.getElementById("content").innerHTML = (`${attackDamage} Attack damage done to enemy, ${monster.HP} HP remains. <br><img src="assets/images/attack.png" alt="Attack">`);
  document.getElementById("content").innerHTML = (`${attackDamage} Magic damage done to enemy, ${monster.HP} HP remains. You have ${player.MP} MP remaining. <br><img src="assets/images/magic.png" alt="Magic">`);
  document.getElementById("player-stats").innerHTML = "";
  document.getElementById("enemy-stats").innerHTML = "";
  for (let stats in player) {
      document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
    }
    for (let stats in monster) {
      document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
    }
  if (monster.HP <= 0 ) {
      victory();
  } else {
  monsterAttack();
  }}
}
/**
 * This function allows the player to restore some HP. It will vary based on current HP and is limited to 3 per game.
 */
function takePotion () {
  if (player.HP === player.maxHP){
      document.getElementById("content").innerHTML = ('You have full HP!')
  } else if (player.maxHP - player.HP <= 20) {
      let differenceHP = player.maxHP - player.HP;
      potion--;
      document.getElementById("content").innerHTML = (`You regain ${differenceHP} points of health`)
      player.HP = player.maxHP,
      monsterAttack();
  } else if (potion > 0) {
      document.getElementById("content").innerHTML = ("You regain 20 points of health");
      player.HP = player.HP + 20;
      potion--;
      monsterAttack();
  } else {
      document.getElementById("content").innerHTML = ('You have no potions left!')
  }
  document.getElementById("player-stats").innerHTML = "";
  document.getElementById("enemy-stats").innerHTML = "";
  for (let stats in player) {
      document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
    }
    for (let stats in monster) {
      document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
    }
}

/**
 * This adds an extra element of randomness to the game, it will allow the player to roll for extra stats at the start, making the game easier or harder depending on the result.
 */
function rollTheDiceStats() {
  document.getElementById("content").innerHTML = player;
  let dice = Math.floor(Math.random() * 6 + 1);
  player.HP += dice * 10;
  player.maxHP = player.HP;
  player.MP += dice;
  player.attackPower += dice;
  player.magicPower += dice;
  player.defence += dice;
  buttonsToggle();
  document.getElementById("player-stats").innerHTML = "";
  document.getElementById("enemy-stats").innerHTML = "";
  document.getElementById("content").innerHTML = `You rolled a ${dice}! Your stats have increased.`;
  switch (dice) {
    case 1:
      document.getElementById("content").innerHTML += `<img src="assets/images/one.png" alt="Dice">`;
      break;
    case 2:
      document.getElementById("content").innerHTML += `<img src="assets/images/two.png" alt="Dice">`;
      break;
    case 3:
      document.getElementById("content").innerHTML += `<img src="assets/images/three.png" alt="Dice">`;
      break;
    case 4:
      document.getElementById("content").innerHTML += `<img src="assets/images/four.png" alt="Dice">`;
      break;
    case 5:
      document.getElementById("content").innerHTML += `<img src="assets/images/five.png" alt="Dice">`;
      break;
    case 6:
      document.getElementById("content").innerHTML += `<img src="assets/images/six.png" alt="Dice">`;
      break;
    default:
      alert(`You rolled a ${dice}, unexpected result.`);
  }
  for (let stats in player) {
    document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
  }
  for (let stats in monster) {
      document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
    }
    document.getElementById("content").innerHTML += `<br>Below are buttons for attack, magic and potion. Your new stats are below.`;
}

/**
 * This happens between monsters, adding a random bonus to the player character.
 */
function rollForBonus(){
  let dice = Math.floor(Math.random() * 6 + 1);
  document.getElementById("content").innerHTML = `You rolled a ${dice}!`;
  switch (dice) {
    case 1:
      document.getElementById("content").innerHTML += `<img src="assets/images/one.png" alt="Dice">`;
      document.getElementById("content").innerHTML += (`Your bonus is 2 more potions!`);
      potion += 2;
      break;
    case 2:
      document.getElementById("content").innerHTML += `<img src="assets/images/two.png" alt="Dice">`;
      document.getElementById("content").innerHTML += (`Your bonus is full HP`);
      player.HP = player.maxHP;
      break;
    case 3:
      document.getElementById("content").innerHTML += `<img src="assets/images/three.png" alt="Dice">`;
      document.getElementById("content").innerHTML += (`Your bonus is full MP`);
      player.MP = player.maxMP;
      break;
    case 4:
      document.getElementById("content").innerHTML += `<img src="assets/images/four.png" alt="Dice">`;
      document.getElementById("content").innerHTML += (`Your bonus is +10 attack power`);
      player.attackPower += 10;
      break;
    case 5:
      document.getElementById("content").innerHTML += `<img src="assets/images/five.png" alt="Dice">`;
      document.getElementById("content").innerHTML += (`Your bonus is +5 magic power`);
      player.magicPower += 5;
      break;
    default:
      document.getElementById("content").innerHTML += `<img src="assets/images/six.png" alt="Dice">`;
      document.getElementById("content").innerHTML += (`Your bonus is double defence`);
      player.defence *= 2;
      break;
  }
  document.getElementById("player-stats").innerHTML = "";
  document.getElementById("enemy-stats").innerHTML = "";
  for (let stats in player) {
      document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
    }
    for (let stats in monster) {
      document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
    }
    let removeElement = document.getElementById("bonusButton");
    removeElement.remove();
    let parentElement = document.getElementById("button-container");
    let buttonHTML = '<button id="nextMonster" class="button" onclick="nextMonster()">Next!</button>';
    parentElement.innerHTML += buttonHTML;
}

/**
 * This function changes some of the play area, and reveals the player and monster stats.
 */
function getStarted() {
  document.getElementById("username").innerHTML = username;
  monster === dragon;
  let gameArea = document.getElementById("game");
  let playArea = document.createElement("p");
  playArea.id = "content";
  gameArea.appendChild(playArea);
  document.getElementById("content").innerHTML = 'Roll the dice for stats! <br> <button class="button hidden" id="rollTheDice"><img src="assets/images/one.png" alt="Dice"></button>';
  document.getElementById("stats").style.visibility = "visible";
  document.getElementById("rollTheDice").style.visibility = "visible";
  document.getElementById("intro").remove();
  for (let stats in player) {
      document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
    }
  for (let stats in monster) {
      document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
    }
    document.getElementById("rollTheDice").addEventListener("click", rollTheDiceStats);
}

/**
 * Simple function to play or stop background music.
 */
playButton.addEventListener('click', function() {
  if (music.paused) {
    music.play();
    playButton.innerHTML = '<img src ="assets/images/mute.png" alt "pause">';
  } else {
    music.pause();
    playButton.innerHTML = '<img src ="assets/images/music.png" alt "Play">';
  }
});

/**
 * This is called when a monster is defeated, and will show what the possible bonuses are.
 * There is an embedded check for screen orientation and the layout of the bonuses will respond accordingly.
 */
function victory() {
  monster.HP = 0;
  document.getElementById("enemy-stats").innerHTML = "";
  if (!(monsterName === "Demon")) {
    for (let stats in monster) {
        document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
      }
    if ((window.orientation === 90 || window.orientation === -90)) {
      document.getElementById("content").innerHTML = `You beat the ${monsterName}! <br> Now roll for a bonus.
      <table>
      <tr>
      <td><img src="assets/images/one.png" alt="Dice"></td>
      <td> 2 More Potions</td>
      <td><img src="assets/images/two.png" alt="Dice"></td>
      <td> Full HP</td>
      <td><img src="assets/images/three.png" alt="Dice"></td>
      <td> Full MP</td>
      </tr>
      <tr>
      <td><img src="assets/images/four.png" alt="Dice"></td>
      <td> +10 Attack Power</td> 
      <td><img src="assets/images/five.png" alt="Dice"></td>
      <td> +5 Magic Power</td> 
      <td><img src="assets/images/six.png" alt="Dice"></td>
      <td> Double Defence</td> 
      </tr>
      </table>`
    } else {
      document.getElementById("content").innerHTML = `You beat the ${monsterName}! <br> Now roll for a bonus.
      <table>
      <tr>
      <td><img src="assets/images/one.png" alt="Dice"></td>
      <td> 2 More Potions</td> 
      </tr>
      <tr>
      <td><img src="assets/images/two.png" alt="Dice"></td>
      <td> Full HP</td> 
      </tr>
      <tr>
      <td><img src="assets/images/three.png" alt="Dice"></td>
      <td> Full MP</td> 
      </tr>
      <tr>
      <td><img src="assets/images/four.png" alt="Dice"></td>
      <td> +10 Attack Power</td> 
      </tr>
      <tr>
      <td><img src="assets/images/five.png" alt="Dice"></td>
      <td> +5 Magic Power</td> 
      </tr>
      <tr>
      <td><img src="assets/images/six.png" alt="Dice"></td>
      <td> Double Defence</td> 
      </tr>
      </table>`;
    }
    buttonsToggle();
    let parentDiv = document.getElementById("button-container");
    let elements = parentDiv.querySelectorAll(".button");
    for (let i = 0; i < elements.length; i++) {
        parentDiv.removeChild(elements[i]);
    }
    let parentElement = document.getElementById("button-container");
    let buttonHTML = '<button id="bonusButton" class="button"><img src="assets/images/one.png" alt="Dice" onclick="rollForBonus()"></button>';
    parentElement.innerHTML += buttonHTML;
    } else {
    completeVictory();
  }
}

/**
 * This function will determine what point in the game the user is at and call the next monster.
 */
function nextMonster() {
let removeElement = document.getElementById("nextMonster");
removeElement.remove();
if (alive.dragon === true) {
  alive.dragon = false;
  monster = vampire;
  monsterName = "Vampire"
  document.getElementById("enemy-name").innerHTML = monsterName;
} else if (alive.dragon === false && alive.vampire === true) {
  alive.vampire = false;
  monster = demon;
  monsterName = "Demon"
  document.getElementById("enemy-name").innerHTML = monsterName;
} else if (alive.vampire === false && alive.demon === true) {
  alive.demon = false;
}
  next();
}

/**
 * This function will prepare the game area for play.
 */
function next(){
document.getElementById("content").innerHTML = `Get ready to fight the ${monsterName}!`;
document.getElementById("enemy-stats").innerHTML = "";
document.getElementById("player-stats").innerHTML = "";
let parentElement = document.getElementById("button-container");
let attack = '<button id="attackButton" class="button"><img src="assets/images/attack.png" alt="Dice" onclick="attack()"></button>';
let magic = '<button id="magicButton" class="button"><img src="assets/images/magic.png" alt="Dice" onclick="magicAttack()"></button>';
let potion = '<button id="potionButton" class="button"><img src="assets/images/potion.png" alt="Dice" onclick="takePotion()"></button>';
parentElement.innerHTML += attack += magic += potion;
for (let stats in player) {
  document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
}
for (let stats in monster) {
    document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
  }
}

/**
 * This a simple function for when the player wins.
 */
function completeVictory() {
document.getElementById("content").innerHTML = ""
alert("You win!");
location.reload();
}

/**
 * The following 3 functions will adjust the monster stats based on difficulty selection.
 */
function easyMode() {
for (let key in dragon) {
  dragon[key] = Math.floor(dragon[key] * 0.8);
}
for (let key in vampire) {
  vampire[key] = Math.floor(vampire[key] * 0.8);
}
for (let key in demon) {
  demon[key] = Math.floor(demon[key] * 0.8);
}
nameEntry();
}

function normalMode() {
nameEntry();
}

function hardMode () {
for (let key in dragon) {
  dragon[key] = Math.ceil(dragon[key] * 1.2);
}
for (let key in vampire) {
  vampire[key] = Math.ceil(vampire[key] * 1.2);
}
for (let key in demon) {
  demon[key] = Math.ceil(demon[key] * 1.2);
}
nameEntry();
}

/**
 * This is called when the player is defeated.
 */
function gameOver() {
player.HP = 0;
      document.getElementById("player-stats").innerHTML = "";
      for (let stats in monster) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
      }
      document.getElementById("content").innerHTML += `<br>You Died. Last attack did ${attackDamage} damage<br>`;
      setTimeout(() => {
        content.innerHTML += '<button class="button" onclick="location.reload()">Try again</button>';
      }, 3000);
}

/**
 * This is to hide the action buttons when it's the monster's turn.
 */
function buttonsToggle() {
if (document.getElementById("button-container").style.visibility === "visible") {
  document.getElementById("button-container").style.visibility = "hidden";
} else {
  document.getElementById("button-container").style.visibility = "visible";
}
}

/**
 * This will collect username information for use in the stat box.
 */
function nameEntry() {
  document.getElementById("difficulty").remove();
  
  let inputDialog = document.getElementById("inputDialog");
  let usernameInput = document.getElementById("usernameInput");
  let submitBtn = document.getElementById("submitBtn");
  inputDialog.style.display = "block";
  submitBtn.addEventListener("click", handleUsernameInput);

  function handleUsernameInput() {
    username = usernameInput.value.trim();
    if (/^[a-zA-Z]+$/.test(username) && username.length <= 20) {
      inputDialog.style.display = "none";
      document.getElementById("username").innerHTML = username;
    } else if (username.length > 20) {
      alert("Input exceeds maximum length of 20 characters. Please enter a shorter name.");
      return;
    } else {
      alert("Invalid input. Please enter text only.");
      return;
    }
    getStarted();
  }
}
