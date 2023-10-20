const body = document.querySelector('body');
const form = document.querySelector('#seconds-form');
const startStop = form.elements.startstop;
const secondsInput = form.elements.seconds;

// Firefox saves the seconds input value when tabs are refreshed/reopened.
// The initial interval must also be set here to avoid the situation in
// which the previous state of the webpage had an invalid value.
const initialInterval = 3;

let interval = null;

const changeColor = function changeColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
};

const startChanging = function startChanging(secondsString) {
  const secondsNum = parseFloat(secondsString);
  const milliseconds = secondsNum * 1000;
  changeColor();
  interval = setInterval(changeColor, milliseconds);
  startStop.value = 'Stop';
  startStop.classList.replace('btn-primary', 'btn-danger');
  secondsInput.disabled = true;
};

const stopChanging = function stopChanging() {
  clearInterval(interval);
  interval = null;
  startStop.value = 'Start';
  startStop.classList.replace('btn-danger', 'btn-primary');
  secondsInput.disabled = false;
};

const toggleChanging = function toggleChanging(event) {
  event.preventDefault();
  if (interval === null) startChanging(secondsInput.value);
  else stopChanging();
};

window.addEventListener('load', () => startChanging(initialInterval));
form.addEventListener('submit', toggleChanging);
