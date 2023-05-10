function replace () {
    document.getElementById('content').innerHTML = "This is the replacement text";
}

let button = document.getElementById('button');
button.addEventListener('click', replace);
