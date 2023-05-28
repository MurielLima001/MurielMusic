const audio = new Audio();
const playPauseButton = document.getElementById('play-pause-button');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const likeButton = document.getElementById('like-button');
const loopButton = document.getElementById('loop-button');
const seekBackwardButton = document.getElementById('seek-backward-button');
const seekForwardButton = document.getElementById('seek-forward-button');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const playerImage = document.getElementById('player-image');

const songs = [
  { title: 'Waste', file: 'waste.mp3', cover: 'https://i1.sndcdn.com/artworks-zTkRgI2ltsmt-0-t500x500.jpg' },
  { title: 'Something in The Way', file: 'nirvana.mp3', cover: 'https://cyberrock.com.br/media/catalog/product/cache/acd2a155febeaa4d64f73ed66cb9661f/c/a/camiseta-nirvana-logo4Dze.jpg' },
  { title: 'Smells', file: 'nirvana_smells.mp3', cover: 'https://cyberrock.com.br/media/catalog/product/cache/acd2a155febeaa4d64f73ed66cb9661f/c/a/camiseta-nirvana-logo4Dze.jpg' },
  { title: 'Hope', file: 'hope.mp3', cover: 'https://i.redd.it/81kz9r0qnwr81.jpg' },
  { title: 'Night', file: 'middle.mp3', cover: 'https://i.pinimg.com/736x/cc/b6/2b/ccb62b8857e4c0517ec8c1fdae649d1b.jpg' }
];

let currentSongIndex = 0;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  playerImage.innerHTML = `<img src="${song.cover}" alt="Capa da Música">`;
  audio.addEventListener('loadedmetadata', function() {
    duration.innerText = formatTime(audio.duration);
  });
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerText = '⏸️';
  } else {
    audio.pause();
    playPauseButton.innerText = '▶️';
  }
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseButton.innerText = '⏸️';
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playPauseButton.innerText = '⏸️';
}

function toggleLike() {
  likeButton.classList.toggle('liked');
}

function toggleLoop() {
  audio.loop = !audio.loop;
  loopButton.classList.toggle('active');
}

function seekBackward() {
  audio.currentTime -= 10;
}

function seekForward() {
  audio.currentTime += 10;
}

function updateProgressBar() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  currentTime.innerText = formatTime(audio.currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

playPauseButton.addEventListener('click', togglePlayPause);
previousButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);
likeButton.addEventListener('click', toggleLike);
loopButton.addEventListener('click', toggleLoop);
seekBackwardButton.addEventListener('click', seekBackward);
seekForwardButton.addEventListener('click', seekForward);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', playNextSong);

loadSong(currentSongIndex);

