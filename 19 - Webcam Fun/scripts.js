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
    // take pixels out. produces array of RGBA value for every pixel in image
    let pixels = ctx.getImageData(0, 0, width, height);
    // alter pixels
    pixels = redEffect(pixels);
    // put pixels back
    ctx.putImageData(pixels, 0, 0);
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
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // blue
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // green
  }
  return pixels;
}
getVideo();

video.addEventListener("canplay", paintToCanvas); // once video is playing it emits a "canplay" event and calls paintToCanvas
