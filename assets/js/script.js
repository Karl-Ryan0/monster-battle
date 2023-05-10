var playerHP = 100;
var playerMP = 100;
var dragonHP = 100;
var vampireHP = 100;
var demonHP = 100;
var potion = 3;


function replace () {
    document.getElementById('content').innerHTML = "This is the replacement text";
}

let attackButton = document.getElementById('attackButton');
attackButton.addEventListener('click', attack);

let magicButton = document.getElementById('magicButton');
magicButton.addEventListener('click', magicAttack);

function attack () {
    let attackDamage = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10 );
    if (attackDamage <= 5) {
        console.log("you missed!")
        attackDamage = 0;
    } else {
        dragonHP = dragonHP - attackDamage;
    }
    console.log(`${attackDamage} damage done to enemy, ${dragonHP} HP remains.`);
    if (dragonHP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
    }
    monsterAttack();
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
    let attackDamage = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10 );
    if (attackDamage >= 15) {
        console.log("Critical hit!")
        attackDamage = attackDamage + 20;
    } else {
        dragonHP = dragonHP - attackDamage;
    }
    console.log(`${attackDamage} damage done to enemy, ${dragonHP} HP remains.`);
    if (dragonHP <= 0 ) {
        alert(`You beat the Dragon. Your last attack did ${attackDamage} damage`)
    }
    monsterAttack();
}