var SNAKE_SPEED = 4;

const info = document.querySelector('.info__button');
const infoText = document.querySelector('.info__container');

info.addEventListener('click', function() {
    info.classList.toggle('is-active');
    infoText.classList.toggle('active');
});

const diff = document.querySelector('.diff__button');
const diffText = document.querySelector('.diff__container');

diff.addEventListener('click', function() {
    diff.classList.toggle('is-active');
    diffText.classList.toggle('active');
});

const play = document.querySelector('.play__button');

play.addEventListener('click', function() {
    // no snake on mobile
    if (window.innerWidth < 960) {
        alert("Sorry, this game is not available on mobile devices.")
        return
    }
    var selected = document.getElementById('diff__select').value
    SNAKE_SPEED = selected * SNAKE_SPEED
    localStorage.speed = SNAKE_SPEED
    window.location.replace("snake.html");
});

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});