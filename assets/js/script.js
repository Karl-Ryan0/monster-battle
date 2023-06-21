let player = {
    HP: 100,
    MP: 100,
    attackPower: 6,
    maxHP: 100,
    magicPower: 800,
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
    alive: true,
}

let vampire = {
  HP: 150,
  MP: 30,
  attackPower: 7,
  maxHP: 150,
  magicPower: 9,
  defence: 5,
  alive: true,
}

let demon = {
  HP: 170,
  MP: 70,
  attackPower: 100,
  maxHP: 130,
  magicPower: 10,
  defence: 8,
  alive: true,
}

let monster;
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

let getStartedButton = document.getElementById('getStarted');
getStartedButton.addEventListener('click', getStarted);

function attack () {
    let attackDamage = Math.floor(Math.random() * 10 + 1) + player.attackPower - monster.defence;
    document.getElementById("attackButton").style.visibility = "hidden";
    document.getElementById("magicButton").style.visibility = "hidden";
    document.getElementById("potionButton").style.visibility = "hidden";
    if (Math.floor(Math.random() * 10 < 2)) {
        document.getElementById("content").innerHTML = ("you missed!")
        attackDamage = 0;
    } else {
        monster.HP = monster.HP - attackDamage;
    }
    document.getElementById("content").innerHTML = (`${attackDamage} Attack damage done to enemy, ${monster.HP} HP remains.`);
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

function monsterAttack(){
  if (monster = dragon) {
      dragonAttack();
  } else if (monster = vampire) {
      vampireAttack();
  } else {
    demonAttack();
  }
}


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
        } else if (attackType === 1) {
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
        player.HP = 0;
        document.getElementById("player-stats").innerHTML = "";
        for (let stats in monster) {
          document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
        }
        document.getElementById("content").innerHTML += `<br>You Died. Last attack did ${attackDamage} damage<br>`;
        setTimeout(() => {
          content.innerHTML += '<button class="button" onclick="location.reload()">Try again</button>';
        }, 3000);
      } else {
        setTimeout(() => {
          document.getElementById("content").innerHTML = `${attackDamage} damage done to player, ${player.HP} HP remains.`;
          document.getElementById("attackButton").style.visibility = "visible";
          document.getElementById("magicButton").style.visibility = "visible";
          document.getElementById("potionButton").style.visibility = "visible";
        }, 3000);
      }
    }, 3000);
  }

function magicAttack () {
    document.getElementById("attackButton").style.visibility = "hidden";
    document.getElementById("magicButton").style.visibility = "hidden";
    document.getElementById("potionButton").style.visibility = "hidden";
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
    document.getElementById("content").innerHTML = (`${attackDamage} Magic damage done to enemy, ${monster.HP} HP remains. You have ${player.MP} MP remaining.`);
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

function rollTheDiceStats() {
    document.getElementById("content").innerHTML = player;
    let dice = Math.floor(Math.random() * 6 + 1);
    player.HP += dice * 10;
    player.maxHP = player.HP;
    player.MP += dice;
    player.attackPower += dice;
    player.magicPower += dice;
    player.defence += dice;

    document.getElementById("attackButton").style.visibility = "visible";
    document.getElementById("magicButton").style.visibility = "visible";
    document.getElementById("potionButton").style.visibility = "visible";
    document.getElementById("player-stats").innerHTML = "";
    document.getElementById("enemy-stats").innerHTML = "";
    document.getElementById("content").innerHTML = `You rolled a ${dice}! Your stats have increased.`;
    if (dice == 1) {
        document.getElementById("content").innerHTML += `<img src="assets/images/one.png" alt="Dice">`;
    } else if (dice == 2) {
        document.getElementById("content").innerHTML += `<img src="assets/images/two.png" alt="Dice">`;
    } else if (dice == 3) {
        document.getElementById("content").innerHTML += `<img src="assets/images/three.png" alt="Dice">`;
    } else if (dice == 4) {
        document.getElementById("content").innerHTML += `<img src="assets/images/four.png" alt="Dice">`;
    } else if (dice == 5) {
        document.getElementById("content").innerHTML += `<img src="assets/images/five.png" alt="Dice">`;
    } else if (dice == 6) {
        document.getElementById("content").innerHTML += `<img src="assets/images/six.png" alt="Dice">`;
    } else {
        alert(`You rolled a ${dice}, unexpected result.`)
    }
    for (let stats in player) {
      document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
    }
    for (let stats in monster) {
        document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
      }
      document.getElementById("content").innerHTML += `<br>Below are buttons for attack, magic and potion. Your new stats are below.`;
  }

function rollForBonus(){
    let dice = Math.floor(Math.random() * 6 + 1);
    document.getElementById("content").innerHTML = `You rolled a ${dice}!`;
    if (dice == 1) {
        document.getElementById("content").innerHTML += `<img src="assets/images/one.png" alt="Dice">`;
        document.getElementById("content").innerHTML += (`Your bonus is 2 more potions!`)
        potion = potion +2;
    } else if (dice == 2) {
        document.getElementById("content").innerHTML += `<img src="assets/images/two.png" alt="Dice">`;
        document.getElementById("content").innerHTML += (`Your bonus is full HP`)
        player.HP = player.maxHP;
    } else if (dice == 3) {
        document.getElementById("content").innerHTML += `<img src="assets/images/three.png" alt="Dice">`;
        document.getElementById("content").innerHTML += (`Your bonus is full MP`)
        player.MP = player.maxMP;
    } else if (dice == 4) {
        document.getElementById("content").innerHTML += `<img src="assets/images/four.png" alt="Dice">`;
        document.getElementById("content").innerHTML += (`Your bonus is +10 attack power`)
        player.attackPower = player.attackPower + 10;
    } else if (dice == 5) {
        document.getElementById("content").innerHTML += `<img src="assets/images/five.png" alt="Dice">`;
        document.getElementById("content").innerHTML += (`Your bonus is +5 magic power`)
        player.magicPower = player.magicPower + 5;
    } else {
        document.getElementById("content").innerHTML += `<img src="assets/images/six.png" alt="Dice">`;
        document.getElementById("content").innerHTML += (`Your bonus is double defence`)
        player.defence = player.defence * 2;
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
      let buttonHTML = '<button id="nextMonster" class="button" onclick="location.reload()">Next!</button>';
      parentElement.innerHTML += buttonHTML;
}

function getStarted() {
    username = window.prompt("Enter your name:");
    document.getElementById("username").innerHTML = username;
    monster = dragon;
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
      let removeElement = document.getElementById("getStarted");
      removeElement.remove();
}

playButton.addEventListener('click', function() {
    if (music.paused) {
      music.play();
      playButton.innerHTML = '<img src ="assets/images/mute.png" alt "pause">';
    } else {
      music.pause();
      playButton.innerHTML = '<img src ="assets/images/music.png" alt "Play">';
    }
  });

function victory() {
    monster.HP = 0;
    document.getElementById("enemy-stats").innerHTML = "";
    for (let stats in monster) {
        document.getElementById("enemy-stats").innerHTML += `${stats}: ${monster[stats]}<br>`;
      }
    document.getElementById("content").innerHTML = `You beat the Dragon! <br> Now roll for a bonus.
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
    let parentDiv = document.getElementById("button-container");
    let elements = parentDiv.querySelectorAll(".button");
    for (let i = 0; i < elements.length; i++) {
        parentDiv.removeChild(elements[i]);
    }
    let parentElement = document.getElementById("button-container");
    let buttonHTML = '<button id="bonusButton" class="button"><img src="assets/images/one.png" alt="Dice" onclick="rollForBonus()"></button>';
    parentElement.innerHTML += buttonHTML;
    }