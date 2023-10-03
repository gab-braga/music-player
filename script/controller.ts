import { musics } from "./musics.js";

let isCloseBoxControl: boolean = true
let delay: boolean = false
let interval: any;
let indexMusic: number  = 0;
let isPlayingMusic: boolean = false;

const btnReturn: HTMLButtonElement = document.querySelector("#return")!
const btnNext: HTMLButtonElement = document.querySelector("#next")!
const btnPlayPause: HTMLButtonElement = document.querySelector("#btn-play-pause")!
const playBar: HTMLInputElement = document.querySelector("#bar-play")!

const author: HTMLElement = document.querySelector("#name-author")!
const title: HTMLElement = document.querySelector("#name-music")!
const image: HTMLImageElement = document.querySelector("#image-music")!
const playPause: HTMLImageElement = document.querySelector("#play-pause")!
const background: HTMLElement = document.querySelector(".box-background")!

const music: HTMLAudioElement = document.createElement('audio')

function showBoxControl(): void {
	const elementBoxControl: HTMLElement = document.querySelector('.box-control')!

	if (isCloseBoxControl) {
		elementBoxControl.style.display = 'flex'
		isCloseBoxControl = false

		setTimeout(() => {
			elementBoxControl.style.display = 'none'
			isCloseBoxControl = true

			if (delay) {
				delay = false
				showBoxControl()
			}
		}, 2000)
	}
	else {
		delay = true
	}
}

function loadMusic(indexMusic: number) {
	if(interval) clearInterval(interval)
	music.src = musics[indexMusic].path
	music.load()
	title.innerHTML = musics[indexMusic].nameMusic
	author.innerHTML = musics[indexMusic].nameAuthor
	image.src = musics[indexMusic].pathImage
	background.style.backgroundImage = `url(${musics[indexMusic].pathImage})`
	interval = setInterval(alterPlayPoint, 1000)
}

loadMusic(indexMusic)

function playMusic(): void {
	music.play();
	isPlayingMusic = true;
	playPause.src = "./assets/icons/pause.svg"
	image.style.animationDuration = '1s'
}

function pauseMusic(): void {
	music.pause();
	isPlayingMusic = false;
	playPause.src = "./assets/icons/play.svg"
	image.style.animationDuration = '0s'
}

function playAndPause(): void {
	if (isPlayingMusic) {
		pauseMusic();
	} else {
		playMusic();
	}
}

function nextMusic(): void {
	indexMusic += 1
	if (indexMusic < musics.length) {
		loadMusic(indexMusic)
		playMusic()
	} else {
		indexMusic = 0;
		loadMusic(indexMusic)
		playMusic()
	}
}

function returnMusic(): void {
	indexMusic -= 1;
	if (indexMusic >= 0) {
		loadMusic(indexMusic)
		playMusic()
	} else {
		indexMusic = musics.length - 1
		loadMusic(indexMusic)
		playMusic()
	}
}

function movePlayPoint(): void {
	const position = music.duration * (Number(playBar.value) / 100);
	music.currentTime = position;
}

function alterPlayPoint(): void {
	let position = 0;

	if (!isNaN(music.duration)) {
		position = music.currentTime * (100 / music.duration);
		playBar.value = String(position);

		if (parseInt(playBar.value) === 100) {
			nextMusic()
		}
	}
}

playBar.addEventListener("change", movePlayPoint)
btnReturn.addEventListener("click", returnMusic)
btnNext.addEventListener("click", nextMusic)
btnPlayPause.addEventListener("click", playAndPause)
document.body.addEventListener("mousemove", showBoxControl)