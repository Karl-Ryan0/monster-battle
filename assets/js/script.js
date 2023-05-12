var player = {
    HP:100,
    MP:100,
    attackPower:6,
    maxHP: 100,
    magicPower:8,
    defence:6,
}

var dragon = {
    HP:130,
    MP:70,
    attackPower:10,
    magicPower:7,
    defence:7,
}

var vampireHP = 100;
var demonHP = 100;
var potion = 3;

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
        console.log("you missed!")
        attackDamage = 0;
    } else {
        dragon.HP = dragon.HP - attackDamage;
    }
    console.log(`${attackDamage} Attack damage done to enemy, ${dragon.HP} HP remains.`);
    if (dragon.HP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
    } else {
    monsterAttack();
    }
}

function monsterAttack() {
    let attackDamage = Math.floor(Math.random() * 10) + dragon.attackPower;
    let attackType = Math.floor(Math.random() * 3);
    if (Math.floor(Math.random() * 10 < 2)) {
        console.log("Enemy missed!")
        attackDamage = 0;
    } else {
        if (attackType === 0){
            console.log("Dragon breaths fire!");
            attackDamage = attackDamage + 20;
        } else if (attackType === 1){
            console.log("Dragon casts magic!");
            attackDamage = attackDamage + 15;
            dragon.MP = dragon.MP - 10;
        } else {
            console.log("Dragon attacks!");
        }
        player.HP = player.HP - (attackDamage - player.defence);
    }
    console.log(`${attackDamage} damage done to player, ${player.HP} HP remains.`);
    if (player.HP <= 0 ) {
        alert(`You Died. Last attack did ${attackDamage} damage`)
    }
}

function magicAttack () {
    if (player.MP <= 0) {
        console.log('You have mo magic power left!')
    } else {
    let attackDamage = Math.floor(Math.random() * 10 + 1) + player.magicPower;
    if (Math.floor(Math.random() * 10 < 2)) {
        console.log("Critical hit!");
        attackDamage = attackDamage + 20;
        dragon.HP = dragon.HP - attackDamage;
    } else {
        dragon.HP = dragon.HP - attackDamage;
    }
    player.MP = player.MP - 10;
    console.log(`${attackDamage} Magic damage done to enemy, ${dragon.HP} HP remains. You have ${player.MP} MP remaining.`);
    if (dragon.HP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
    } else {
    monsterAttack();
    }}
}

function takePotion () {
    if (player.HP === player.maxHP){
        console.log('You have full HP!')
    } else if (player.maxHP - player.HP <= 20) {
        let differenceHP = player.maxHP - player.HP;
        potion--;
        console.log(`You regain ${differenceHP} points of health`)
        player.HP = player.maxHP,
        monsterAttack();
    } else if (potion > 0) {
        console.log("You regain 20 points of health");
        player.HP = player.HP + 20;
        potion--;
        monsterAttack();
    } else {
        console.log('You have no potions left!')
    }
}

function rollTheDiceStats(){
    console.log(player);
    let dice = Math.floor(Math.random() * 6 + 1);
    player.HP += dice * 10,
    player.maxHP = player.HP;
    player.MP += dice;
    player.attackPower += dice;
    player.magicPower += dice;
    player.defence += dice;
    console.log(`You rolled a ${dice}! Your stats have increased.`);
    document.getElementById("rollTheDice").style.visibility = "hidden";
    document.getElementById("attackButton").style.visibility = "visible";
    document.getElementById("magicButton").style.visibility = "visible";
    document.getElementById("potionButton").style.visibility = "visible";
}

function getStarted() {
    music.play();
    document.getElementById("getStarted").style.visibility = "hidden";
    document.getElementById("rollTheDice").style.visibility = "visible";
}