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
  // play camera shutter sound
  snap.currentTime = 0;
  snap.play();
  // take data out of canvas
  const data = canvas.toDataURL("image/jpeg"); // base64 = text based representation of photo
  // create link to download photo
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "wonder");
  link.innerHTML = `<img src="${data}" alt="Wonder">`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener("canplay", paintToCanvas); // once video is playing it emits a "canplay" event and calls paintToCanvas
