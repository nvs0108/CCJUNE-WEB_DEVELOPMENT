
const daysInput = document.getElementById('days');
const hoursInput = document.getElementById('hours');
const minsInput = document.getElementById('mins');
const secondsInput = document.getElementById('seconds');
const startButton = document.querySelector('.btn-start');
const stopButton = document.querySelector('.btn-stop');
const resetButton = document.querySelector('.btn-reset');
const saveButton = document.querySelector('.btn-save');
const loadButton = document.querySelector('.btn-load');
const alarmSound = document.querySelector('.alarm-sound');
const beepAudio = document.getElementById('beep');

let countdownInterval;
let remainingTime;
let endTime;

function handleKeyPress(event) {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

function updateCountdown() {
  const currentTime = new Date().getTime();
  remainingTime = endTime - currentTime;

  if (remainingTime >= 0) {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    daysInput.textContent = formatTime(days);
    hoursInput.textContent = formatTime(hours);
    minsInput.textContent = formatTime(minutes);
    secondsInput.textContent = formatTime(seconds);
  } else {
    clearInterval(countdownInterval);
    playAlarmSound();
  }
}

function startCountdown() {
  const days = parseInt(daysInput.textContent) || 0;
  const hours = parseInt(hoursInput.textContent) || 0;
  const minutes = parseInt(minsInput.textContent) || 0;
  const seconds = parseInt(secondsInput.textContent) || 0;

  const currentTime = new Date().getTime();
  endTime = currentTime + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

  countdownInterval = setInterval(updateCountdown, 1000);

  disableInputs();
}

function stopCountdown() {
  clearInterval(countdownInterval);
  enableInputs();
}

function resetCountdown() {
  clearInterval(countdownInterval);
  daysInput.textContent = '00';
  hoursInput.textContent = '00';
  minsInput.textContent = '00';
  secondsInput.textContent = '00';
  enableInputs();
}

function saveTimer() {
  const timerValues = {
    days: daysInput.textContent,
    hours: hoursInput.textContent,
    minutes: minsInput.textContent,
    seconds: secondsInput.textContent
  };

  const timerData = JSON.stringify(timerValues);
  localStorage.setItem('timer', timerData);
}

function loadTimer() {
  const timerData = localStorage.getItem('timer');
  if (timerData) {
    const timerValues = JSON.parse(timerData);
    daysInput.textContent = timerValues.days;
    hoursInput.textContent = timerValues.hours;
    minsInput.textContent = timerValues.minutes;
    secondsInput.textContent = timerValues.seconds;
  }
}

function formatTime(value) {
  return value.toString().padStart(2, '0');
}

function playAlarmSound() {
  const selectedSound = alarmSound.value;
  beepAudio.src = selectedSound;
  beepAudio.play();
}

function disableInputs() {
  daysInput.contentEditable = false;
  hoursInput.contentEditable = false;
  minsInput.contentEditable = false;
  secondsInput.contentEditable = false;
  startButton.disabled = true;
  resetButton.disabled = true;
  saveButton.disabled = true;
  loadButton.disabled = true;
}

function enableInputs() {
  daysInput.contentEditable = true;
  hoursInput.contentEditable = true;
  minsInput.contentEditable = true;
  secondsInput.contentEditable = true;
  startButton.disabled = false;
  resetButton.disabled = false;
  saveButton.disabled = false;
  loadButton.disabled = false;
}

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);
resetButton.addEventListener('click', resetCountdown);
saveButton.addEventListener('click', saveTimer);
loadButton.addEventListener('click', loadTimer);
