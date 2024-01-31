const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false }) // access webcam
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => console.error(`Uh oh!`, err));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // explicitly set canvas height and width
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // paints video onto canvas, updates every 16 ms
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
}

getVideo();
