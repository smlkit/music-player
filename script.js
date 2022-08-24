"use strict";

const player = document.querySelector(".player");

const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

const volumeContainer = document.querySelector(".volume-container");
const volume = document.querySelector(".volume");
const volumeBtn = document.querySelector("#volume-btn");

const count = document.querySelector("#count");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const audio = document.querySelector("#audio");
const cover = document.querySelector("#cover");

const timeCurrent = document.querySelector("#time-current");
const timeAll = document.querySelector("#time-all");

const songsList = [
  {
    img: `assets/img/indiebox-1.jpg`,
    title: "A Fine Day",
    author: "Indie Box",
    music: `assets/music/afineday.mp3`,
  },
  {
    img: "assets/img/twinsmusic.jpg",
    title: "Alright Then",
    author: "Twins Music",
    music: "assets/music/alrightthen.mp3",
  },
  {
    img: "assets/img/indiebox-2.jpg",
    title: "Flying Hearts",
    author: "Indie Box",
    music: "assets/music/flyinghearts.mp3",
  },
];

let songIndex = 0;

let currentVolume = 0.7;
audio.volume = currentVolume;

loadSong(songIndex);

let secondsAll = 0;
let minutesAll = 0;

audio.onloadedmetadata = function () {
  let time = audio.duration;

  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  timeAll.innerText =
    `${minutes}`.padStart(2, "0") + `:` + `${seconds}`.padStart(2, "0");
};

function playSong() {
  player.classList.add("play");
  playBtn.querySelector("i.p").classList.remove("ri-play-circle-fill");
  playBtn.querySelector("i.p").classList.add("ri-pause-circle-fill");

  audio.play();
}

function pauseSong() {
  player.classList.remove("play");
  playBtn.querySelector("i.p").classList.remove("ri-pause-circle-fill");
  playBtn.querySelector("i.p").classList.add("ri-play-circle-fill");

  audio.pause();
}

function loadSong(songIndex) {
  count.innerText = `Трек ${songIndex + 1} из ${songsList.length}`;

  title.innerText = songsList[songIndex].title;
  author.innerText = songsList[songIndex].author;
  audio.src = songsList[songIndex].music;
  cover.src = songsList[songIndex].img;

  timeAll.innderText = songsList[songIndex].music.duration;
}

function prevSong() {
  if (songIndex <= 0) {
    songIndex = songsList.length - 1;
  } else {
    songIndex--;
  }

  loadSong(songIndex);
  playSong();
}

function nextSong() {
  if (songIndex >= songsList.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  loadSong(songIndex);
  playSong();
}

playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function updateProgress(e) {
  //   console.log(e);
  //   console.log(e.srcElement);
  //   console.log(e.srcElement.currentTime);
  //   console.log(e.srcElement.duration);
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  let time = audio.currentTime;

  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  timeCurrent.innerText =
    `${minutes}`.padStart(2, "0") + `:` + `${seconds}`.padStart(2, "0");
}

function setProgress(e) {
  // console.log(e);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

const mute = function () {
  player.classList.add("muted");

  volumeBtn.querySelector(".v").classList.remove("ri-volume-up-fill");
  volumeBtn.querySelector(".v").classList.add("ri-volume-mute-fill");

  let prevVolume = currentVolume;
  audio.volume = 0;
  volume.style.width = `0%`;

  currentVolume = prevVolume;
};

const unmute = function () {
  player.classList.remove("muted");

  volumeBtn.querySelector(".v").classList.remove("ri-volume-mute-fill");
  volumeBtn.querySelector(".v").classList.add("ri-volume-up-fill");

  audio.volume = currentVolume;
  console.log(currentVolume);
  volume.style.width = `${currentVolume * 100}%`;
};

const setVolume = function (e) {
  const width = this.clientWidth;
  const clickLocation = e.offsetX;
  const newVolume = clickLocation / width;
  //   console.log(width);
  //   console.log(clickLocation);
  //   console.log(newVolume);
  currentVolume = newVolume;
  audio.volume = currentVolume;
  volume.style.width = `${currentVolume * 100}%`;
};

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setProgress);

volumeBtn.addEventListener("click", () => {
  const isMuted = player.classList.contains("muted");

  isMuted ? unmute() : mute();
});

volumeContainer.addEventListener("click", setVolume);
