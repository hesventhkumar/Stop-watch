let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startButton = document.getElementById('start');
const lapButton = document.getElementById('lap');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCount = 1;
}

function addLap() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.innerText = `Lap ${lapCount++}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startTimer);
lapButton.addEventListener('click', addLap);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);