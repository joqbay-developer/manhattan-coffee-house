

const PARAMETER_VALUE = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
const API_KEY = 'AIzaSyCKIFzokA_y9uzFRzr9z0dSAYi-HuU35cQ';

async function initAerialView() {
  const displayEl = document.querySelector('video');
  displayEl.addEventListener('click', function () {
    if (displayEl.paused) {
      displayEl.play();
    } else {
      displayEl.pause();
    }
  });

  // Parameter key can accept either 'videoId' or 'address' depending on input.
  const parameterKey = videoIdOrAddress(PARAMETER_VALUE);
  const urlParameter = new URLSearchParams();
  urlParameter.set(parameterKey, PARAMETER_VALUE);
  urlParameter.set('key', API_KEY);
  const response = await fetch(`https://aerialview.googleapis.com/v1/videos:lookupVideo?${urlParameter.toString()}`);
  const videoResult = await response.json();

  if (videoResult.state === 'PROCESSING') {
    alert('Video still processing..');
  } else if (videoResult.error && videoResult.error.code === 404) {
    alert('Video not found. To generate video for an address, call on Aerial view renderVideo method.');
  } else {
    displayEl.src = videoResult.uris.MP4_MEDIUM.landscapeUri
  }
}

function videoIdOrAddress(value) {
  const videoIdRegex = /[0-9a-zA-Z-_]{22}/;
  return value.match(videoIdRegex) ? 'videoId' : 'address';
}

initAerialView();