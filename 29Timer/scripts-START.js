let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const displayTimeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const audio = new Audio('alarm.mp3');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(function () {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            audio.play();
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const secondsLeft = seconds % 60;
    const display = `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft >= 10 ? '' : '0'}${secondsLeft}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const pre = hour > 12 ? 'pm' : 'am';
    const hoursNotEu = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    displayTimeEnd.textContent = `be back at ${hoursNotEu}:${minutes < 10 ? '0' : ''}${minutes} ${pre}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});