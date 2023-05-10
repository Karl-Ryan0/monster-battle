var playerHP = 100;
var playerMP = 100;
var dragonHP = 100;
var vampireHP = 100;
var demonHP = 100;


function replace () {
    document.getElementById('content').innerHTML = "This is the replacement text";
}

let button = document.getElementById('button');
button.addEventListener('click', attack);

function attack () {
    let attackDamage = Math.floor(Math.random() * 10)
    dragonHP = dragonHP - attackDamage;
    console.log(dragonHP);
    alert(dragonHP);
}