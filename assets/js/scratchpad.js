var player = {
 HP:100,
 MP:100,
 attackPower:6,
 magicPower:8,
 defence:6,
}

function rollTheDiceStats(){
    console.log(player);
    let dice = Math.floor(Math.random() * 6);
    player.HP += dice * 10,
    player.MP += dice;
    player.attackPower += dice;
    player.magicPower += dice;
    player.defence += dice;
    console.log(player);
}

rollTheDiceStats()