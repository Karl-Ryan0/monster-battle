let player = {
    HP: 100,
    MP: 100,
    attackPower: 6,
    maxHP: 100,
    magicPower: 8,
    defence: 6,
}

let dragon = {
    HP: 130,
    MP: 70,
    attackPower: 10,
    maxHP: 130,
    magicPower: 7,
    defence: 7,
}

let vampireHP = 100;
let demonHP = 100;
let potion = 3;

const playButton = document.getElementById('playButton');
const music = document.getElementById('music');

let attackButton = document.getElementById('attackButton');
attackButton.addEventListener('click', attack);

let magicButton = document.getElementById('magicButton');
magicButton.addEventListener('click', magicAttack);

let potionButton = document.getElementById('potionButton');
potionButton.addEventListener('click', takePotion);

let rollTheDice = document.getElementById('rollTheDice');
rollTheDice.addEventListener('click', rollTheDiceStats);

let getStartedButton = document.getElementById('getStarted');
getStartedButton.addEventListener('click', getStarted);

function attack () {
    let attackDamage = Math.floor(Math.random() * 10 + 1) + player.attackPower - dragon.defence;
    if (Math.floor(Math.random() * 10 < 2)) {
        document.getElementById("content").innerHTML = ("you missed!")
        attackDamage = 0;
    } else {
        dragon.HP = dragon.HP - attackDamage;
    }
    document.getElementById("content").innerHTML = (`${attackDamage} Attack damage done to enemy, ${dragon.HP} HP remains.`);
    if (dragon.HP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
    } else {
    monsterAttack();
    }
}

function monsterAttack() {
    setTimeout(() => {
        let attackDamage = Math.floor(Math.random() * 10) + dragon.attackPower;
        let attackType = Math.floor(Math.random() * 3);
        if (Math.floor(Math.random() * 10 < 2)) {
            document.getElementById("content").innerHTML = ("Enemy missed!")
            attackDamage = 0;
        } else {
            if (attackType === 0){
                document.getElementById("content").innerHTML = ("Dragon breaths fire!");
                attackDamage = attackDamage + 20;
            } else if (attackType === 1){
                document.getElementById("content").innerHTML = ("Dragon casts magic!");
                attackDamage = attackDamage + 15;
                dragon.MP = dragon.MP - 10;
            } else {
                document.getElementById("content").innerHTML = ("Dragon attacks!");
            }
            player.HP = player.HP - (attackDamage - player.defence);
            document.getElementById("player-stats").innerHTML = "";
        for (let stats in player) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
      }
        }
        document.getElementById("content").innerHTML = (`${attackDamage} damage done to player, ${player.HP} HP remains.`);
        if (player.HP <= 0 ) {
            alert(`You Died. Last attack did ${attackDamage} damage`)
        }
    }, 5000);
}

function magicAttack () {
    if (player.MP <= 0) {
        document.getElementById("content").innerHTML = ('You have mo magic power left!')
    } else {
    let attackDamage = Math.floor(Math.random() * 10 + 1) + player.magicPower;
    if (Math.floor(Math.random() * 10 < 2)) {
        document.getElementById("content").innerHTML = ("Critical hit!");
        attackDamage = attackDamage + 20;
        dragon.HP = dragon.HP - attackDamage;
    } else {
        dragon.HP = dragon.HP - attackDamage;
    }
    player.MP = player.MP - 10;
    document.getElementById("content").innerHTML = (`${attackDamage} Magic damage done to enemy, ${dragon.HP} HP remains. You have ${player.MP} MP remaining.`);
    document.getElementById("player-stats").innerHTML = "";
    for (let stats in player) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
      }
    if (dragon.HP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
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
    for (let stats in player) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
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
    document.getElementById("content").innerHTML = `You rolled a ${dice}! Your stats have increased.`;
    document.getElementById("rollTheDice").style.visibility = "hidden";
    document.getElementById("attackButton").style.visibility = "visible";
    document.getElementById("magicButton").style.visibility = "visible";
    document.getElementById("potionButton").style.visibility = "visible";
    document.getElementById("player-stats").innerHTML = "";
    for (let stats in player) {
      document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
    }
  }

function getStarted() {
    document.getElementById("content").innerHTML = "Roll the dice for stats!";
    document.getElementById("getStarted").style.visibility = "hidden";
    document.getElementById("rollTheDice").style.visibility = "visible";
    document.getElementById("intro").remove();
    document.getElementById("content").style.visibility = "visible";
    for (let stats in player) {
        document.getElementById("player-stats").innerHTML += `${stats}: ${player[stats]}<br>`;
      }
    for (let stats in player) {
        document.getElementById("enemy-stats").innerHTML += `${stats}: ${dragon[stats]}<br>`;
      }
}

playButton.addEventListener('click', function() {
    if (music.paused) {
      music.play();
      playButton.textContent = 'Pause Music';
    } else {
      music.pause();
      playButton.textContent = 'Play Music';
    }
  });