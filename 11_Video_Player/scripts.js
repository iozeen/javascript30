/* ELEMENTS */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenBtn = document.getElementById("fullscreenbtn");
console.log(fullScreenBtn);
let isFullScreen = false;

/* FUNCTIONS */
function togglePlay() {
    if (video.paused) {
        video.play();

    } else {
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log("update btn");
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
    console.log(`${this.name}:${this.value}`);
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

function handleFullScreen(){
    if(isFullScreen){
        isFullScreen = false;
        exitFullScreen(document);
    }else{
        isFullScreen = true;
        enterFullScreen(player);
    }

    console.log(isFullScreen);
}

function enterFullScreen(element){
    if(element.requestFullScreen){
        element.requestFullScreen();
    }else if(element.webkitRequestFullScreen){
        element.webkitRequestFullScreen();
    }else if(element.mozRequestFullScreen){
        element.mozRequestFullScreen();
    }
}

function exitFullScreen(element){
    if(element.cancelFullScreen){
        console.log("cancer");
        element.cancelFullScreen();
    }else if(element.webkitCancelFullScreen){
        console.log("cancer web");
        element.webkitCancelFullScreen();
    }else if(element.mozCancelFullScreen){
        console.log("cancer moz");
        element.mozCancelFullScreen();
    }
}

/* EVENT LISTENERS */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
let mouseRangeDown = false;
ranges.forEach(range => range.addEventListener('mousemove', () => mouseRangeDown && handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', () => mouseRangeDown = true));
ranges.forEach(range => range.addEventListener('mouseup', () => mouseRangeDown = true));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreenBtn.addEventListener('click', handleFullScreen);