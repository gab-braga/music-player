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
		name_music: "We are!",
		name_author: "One Piece",
		image_music: "./images/music-images/one_piece.jpg",
		path: "./music/One_Piece_We_Are.mp3"
	},
	{
		name_music: "Bink's Sake",
		name_author: "Brook",
		image_music: "./images/music-images/brook.jpg",
		path: "./music/BinksSake.mp3"
	},
	{
		name_music: "Blue Bird",
		name_author: "Naruto Shippuden - Yoshiki Mizuno",
		image_music: "./images/music-images/naruto-shippuden-blue-bird.jpg",
		path: "./music/naruto-shippuden-blue-bird.mp3"
	},
	{
		name_music: "Kaze Wind Yamazaru",
		name_author: "Naruto Shippuden - Yamazaru",
		image_music: "./images/music-images/naruto-shippuden-17.jpg",
		path: "./music/Naruto_Shippuden_Kaze_Wind_Yamazaru.mp3"
	},
	{
		name_music: "Dragon Ball Z - 1° Abertura",
		name_author: "Dragon Ball Z",
		image_music: "./images/music-images/dragon-ball-z-1.jpg",
		path: "./music/Dragon_Ball_Z_Abertura_1.mp3"
	},
	{
		name_music: "Dragon Ball Z - 2° Abertura",
		name_author: "Dragon Ball Z",
		image_music: "./images/music-images/dragon-ball-z-2.jpg",
		path: "./music/Dragon_Ball_Z_Abertura_2.mp3"
	},
	{
		name_music: "Attack on Titan",
		name_author: "Attack on Titan",
		image_music: "./images/music-images/Attack_on_Titan.jpg",
		path: "./music/Attack_On_Titan_2.mp3"
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
	}
}