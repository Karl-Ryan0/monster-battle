var player = {
    HP:100,
    MP:100,
    attackPower:6,
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

let attackButton = document.getElementById('attackButton');
attackButton.addEventListener('click', attack);

let magicButton = document.getElementById('magicButton');
magicButton.addEventListener('click', magicAttack);

let potionButton = document.getElementById('potionButton');
potionButton.addEventListener('click', takePotion);

function attack () {
    let attackDamage = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10 );
    if (attackDamage <= 5) {
        console.log("you missed!")
        attackDamage = 0;
    } else {
        dragonHP = dragonHP - attackDamage;
    }
    console.log(`${attackDamage} Attack damage done to enemy, ${dragonHP} HP remains.`);
    if (dragonHP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
    } else {
    monsterAttack();
    }
}

function monsterAttack() {
    let attackDamage = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10 );
    if (attackDamage <= 5) {
        console.log("Enemy missed!")
        attackDamage = 0;
    } else {
        playerHP = playerHP - attackDamage;
    }
    console.log(`${attackDamage} damage done to player, ${playerHP} HP remains.`);
    if (playerHP <= 0 ) {
        alert(`You Died. Last attack did ${attackDamage} damage`)
    }
}

function magicAttack () {
    if (playerMP <= 0) {
        console.log('You have mo magic power left!')
    } else {
    let attackDamage = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10 ) + 5;
    if (attackDamage >= 15) {
        console.log("Critical hit!")
        attackDamage = attackDamage + 20;
        dragonHP = dragonHP - attackDamage;
    } else {
        dragonHP = dragonHP - attackDamage;
    }
    playerMP = playerMP - 10;
    console.log(`${attackDamage} Magic damage done to enemy, ${dragonHP} HP remains. You have ${playerMP} MP remaining.`);
    if (dragonHP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
    } else {
    monsterAttack();
    }}
}

function takePotion () {
    if (playerHP === 100){
        console.log('You have full HP!')
    } else if (playerHP >= 80) {
        let differenceHP = 100 - playerHP;
        potion--;
        console.log(`You regain ${differenceHP} points of health`)
        playerHP = 100,
        monsterAttack();
    } else if (potion > 0) {
        console.log("You regain 20 points of health");
        playerHP = playerHP + 20;
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
    player.MP += dice;
    player.attackPower += dice;
    player.magicPower += dice;
    player.defence += dice;
    console.log(player);
}