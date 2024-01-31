// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const volumeInput = document.querySelector('input[name="volume"]');
const speedInput = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress__filled');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function updateVolume() {
  video.volume = this.value;
}

function updateSpeed() {
  video.playbackRate = this.value;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

playButton.addEventListener('click', togglePlay);

volumeInput.addEventListener('input', updateVolume);
speedInput.addEventListener('input', updateSpeed);

skipButtons.forEach(button => button.addEventListener('click', skip));
