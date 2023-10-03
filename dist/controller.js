import { musics } from "./musics.js";
let isCloseBoxControl = true;
let delay = false;
let interval;
let indexMusic = 0;
let isPlayingMusic = false;
const btnReturn = document.querySelector("#return");
const btnNext = document.querySelector("#next");
const btnPlayPause = document.querySelector("#btn-play-pause");
const playBar = document.querySelector("#bar-play");
const author = document.querySelector("#name-author");
const title = document.querySelector("#name-music");
const image = document.querySelector("#image-music");
const playPause = document.querySelector("#play-pause");
const background = document.querySelector(".box-background");
const music = document.createElement('audio');
function showBoxControl() {
    const elementBoxControl = document.querySelector('.box-control');
    if (isCloseBoxControl) {
        elementBoxControl.style.display = 'flex';
        isCloseBoxControl = false;
        setTimeout(() => {
            elementBoxControl.style.display = 'none';
            isCloseBoxControl = true;
            if (delay) {
                delay = false;
                showBoxControl();
            }
        }, 2000);
    }
    else {
        delay = true;
    }
}
function loadMusic(indexMusic) {
    if (interval)
        clearInterval(interval);
    music.src = musics[indexMusic].path;
    music.load();
    title.innerHTML = musics[indexMusic].nameMusic;
    author.innerHTML = musics[indexMusic].nameAuthor;
    image.src = musics[indexMusic].pathImage;
    background.style.backgroundImage = `url(${musics[indexMusic].pathImage})`;
    interval = setInterval(alterPlayPoint, 1000);
}
loadMusic(indexMusic);
function playMusic() {
    music.play();
    isPlayingMusic = true;
    playPause.src = "./images/pause.svg";
    image.style.animationDuration = '1s';
}
function pauseMusic() {
    music.pause();
    isPlayingMusic = false;
    playPause.src = "./images/play.svg";
    image.style.animationDuration = '0s';
}
function playAndPause() {
    if (isPlayingMusic) {
        pauseMusic();
    }
    else {
        playMusic();
    }
}
function nextMusic() {
    indexMusic += 1;
    if (indexMusic < musics.length) {
        loadMusic(indexMusic);
        playMusic();
    }
    else {
        indexMusic = 0;
        loadMusic(indexMusic);
        playMusic();
    }
}
function returnMusic() {
    indexMusic -= 1;
    if (indexMusic >= 0) {
        loadMusic(indexMusic);
        playMusic();
    }
    else {
        indexMusic = musics.length - 1;
        loadMusic(indexMusic);
        playMusic();
    }
}
function movePlayPoint() {
    const position = music.duration * (Number(playBar.value) / 100);
    music.currentTime = position;
}
function alterPlayPoint() {
    let position = 0;
    if (!isNaN(music.duration)) {
        position = music.currentTime * (100 / music.duration);
        playBar.value = String(position);
        if (parseInt(playBar.value) === 100) {
            nextMusic();
        }
    }
}
playBar.addEventListener("change", movePlayPoint);
btnReturn.addEventListener("click", returnMusic);
btnNext.addEventListener("click", nextMusic);
btnPlayPause.addEventListener("click", playAndPause);
document.body.addEventListener("mousemove", showBoxControl);
