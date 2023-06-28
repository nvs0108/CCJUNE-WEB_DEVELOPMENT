document.addEventListener('DOMContentLoaded', () => {
    const stopwatchContainer = document.getElementById('stopwatch');
    const startButton = stopwatchContainer.querySelector('.btn-start1');
    const stopButton = stopwatchContainer.querySelector('.btn-stop1');
    const resetButton = stopwatchContainer.querySelector('.btn-reset1');
    const lapButton = stopwatchContainer.querySelector('.btn-lap1');
    const minutesDisplay = stopwatchContainer.querySelector('.mins1');
    const secondsDisplay = stopwatchContainer.querySelector('.seconds1');
    const tensDisplay = stopwatchContainer.querySelector('.tens1');
    const lapList = stopwatchContainer.querySelector('#lap-list1');
  
    let timerInterval;
    let tens = 0;
    let seconds = 0;
    let minutes = 0;
    let lapIndex = 1;
  
    const formatTime = (value) => {
      return value < 10 ? `0${value}` : value;
    };
  
    const updateDisplay = () => {
      tensDisplay.textContent = formatTime(tens);
      secondsDisplay.textContent = formatTime(seconds);
      minutesDisplay.textContent = formatTime(minutes);
    };
  
    const startStopwatch = () => {
      startButton.disabled = true;
      stopButton.disabled = false;
      resetButton.disabled = true;
      lapButton.disabled = false;
  
      timerInterval = setInterval(() => {
        tens++;
        if (tens === 100) {
          seconds++;
          tens = 0;
        }
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
        updateDisplay();
      }, 10);
    };
  
    const stopStopwatch = () => {
      startButton.disabled = false;
      stopButton.disabled = true;
      resetButton.disabled = false;
      lapButton.disabled = true;
  
      clearInterval(timerInterval);
    };
  
    const resetStopwatch = () => {
      stopStopwatch();
  
      tens = 0;
      seconds = 0;
      minutes = 0;
      lapIndex = 1;
  
      updateDisplay();
      lapList.innerHTML = '';
    };
  
    const recordLapTime = () => {
      const lapTimeItem = document.createElement('li');
      lapTimeItem.textContent = `Lap ${lapIndex}: ${minutes}:${seconds}:${tens}`;
      lapList.appendChild(lapTimeItem);
      lapIndex++;
    };
  
    startButton.addEventListener('click', startStopwatch);
    stopButton.addEventListener('click', stopStopwatch);
    resetButton.addEventListener('click', resetStopwatch);
    lapButton.addEventListener('click', recordLapTime);
  });
  