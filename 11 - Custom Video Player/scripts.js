// get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelector("[data-skip]");
const ranges = player.querySelector(".player__slider");

// build functions
function togglePlay() {
  // toggle play based on paused property of video
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

// hook up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

toggle.addEventListener("click", togglePlay);
