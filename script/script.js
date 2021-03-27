let is_close_box_control = true
let delay = false

function show_box_control() {
    const elementBoxControl = document.querySelector('.box-control')

    if(is_close_box_control) {
        elementBoxControl.style.display = 'flex'
        is_close_box_control = false
        
        setTimeout(function keep_open_box_control() {
            elementBoxControl.style.display = 'none'
            is_close_box_control = true
    
            if(delay) {
                delay = false
                show_box_control()
            }
        }, 2000)
    }
    else {
        delay = true
    }
}

const author = document.querySelector("#name_author")
const title = document.querySelector("#name_music")
const image = document.querySelector("#image_music")
const play_pause = document.querySelector("#play_pause")
const play_bar = document.querySelector("#bar-play")

const background = document.querySelector(".box-background")

let index_music = 0;
let is_playing_music = false;
let music = document.createElement('audio')

const musics = [
	{
		name_music: "Coração de Criança",
		name_author: "Dragon Ball GT",
		image_music: "./images/music-images/dragon-ball-gt.jpg",
		path: "./music/dragon-ball-gt-abertura.mp3"
	},
	{
		name_music: "Blue Bird",
		name_author: "Naruto Shippuden",
		image_music: "./images/music-images/naruto-shippuden-blue-bird.jpg",
		path: "./music/naruto-shippuden-blue-bird.mp3"
	},
	{
		name_music: "Pokémon",
		name_author: "Pokémon",
		image_music: "./images/music-images/pokemon.jpg",
		path: "./music/pokemon-abertura.mp3"
	},
	{
		name_music: "We are!",
		name_author: "One Piece",
		image_music: "./images/music-images/one-piece.jpg",
		path: "./music/one-piece-we-are.mp3"
	},
	{
		name_music: "Shinzou wo Sasageyo",
		name_author: "Shingeki no Kyojin",
		image_music: "./images/music-images/attack-on-titan.jpg",
		path: "./music/attack-on-titan-2.mp3"
	},
	{
		name_music: "Bink's Sake",
		name_author: "Brook",
		image_music: "./images/music-images/brook.jpg",
		path: "./music/binks-sake.mp3"
	},
	{
		name_music: "Dragon Ball Z",
		name_author: "Dragon Ball Z",
		image_music: "./images/music-images/dragon-ball-z-1.jpg",
		path: "./music/dragon-ball-z-abertura-1.mp3"
	}
];

function load_music(index_music) {
	music.src = musics[index_music].path
	music.load()
	title.innerHTML = musics[index_music].name_music
	author.innerHTML = musics[index_music].name_author
	image.src = musics[index_music].image_music
	background.style.backgroundImage = `url(${ musics[index_music].image_music})`
	setInterval(alter_play_point, 1000)
}

load_music(index_music)

function play_music() {
	music.play();
	is_playing_music = true;
	play_pause.src = "./images/pause.svg"
	image.style.animationDuration = '1s'
}

function pause_music() {
	music.pause();
	is_playing_music = false;
	play_pause.src = "./images/play.svg"
	image.style.animationDuration = '0s'
}

function play_and_pause() {
	if (is_playing_music) {
		pause_music();
	} else {
		play_music();
	}
}

function next_music() {
		index_music += 1
	if (index_music < musics.length) {
		load_music(index_music)
		play_music()
	} else {
		index_music = 0;
		load_music(index_music)
		play_music()
	}
}

function return_music() {
		index_music -= 1;
	if (index_music >= 0) {
		load_music(index_music)
		play_music()
	} else{
		index_music = musics.length - 1
		load_music(index_music)
		play_music()
	}
}

function move_play_point() {
	const position = music.duration * (play_bar.value / 100);
	music.currentTime = position;
}

function alter_play_point() {
	let position = 0;

	if (!isNaN(music.duration)) {
		position = music.currentTime * (100 / music.duration);
		play_bar.value = position;
		
		if(parseInt(play_bar.value) === 100) {
			next_music()
		}
	}
}