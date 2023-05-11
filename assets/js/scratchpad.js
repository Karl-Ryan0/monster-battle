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

var vampire = {
    HP:90,
    MP:40,
    attackPower:9,
    magicPower:7,
    defence:4,
}

var demon = {
    HP:145,
    MP:90,
    attackPower:9,
    magicPower:7,
    defence:8,
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

function attack () {
    let attackDamage = Math.floor(Math.random() * 10 + 1) + player.attackPower;
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

rollTheDiceStats()
attack()
attack()
attack()
attack()
attack()
attack()
attack()
attack()
attack()
attack()
attack()
attack()