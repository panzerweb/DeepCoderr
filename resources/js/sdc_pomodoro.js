let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let isPaused = false;
let clicked = false;

export function playTimer(){
    if (!clicked) {
        timer = setInterval(() => {
            updateTimer();
        }, 1000);
        
        isPaused = false;
        clicked = true;
    }
    console.log(clicked);
}

function updateTimer(){
    const timerDisplay = document.getElementById("timer")
    timerDisplay.textContent = formatTime(hours, minutes, seconds);

    if(hours === 0 && minutes == 0 && seconds == 0){
        clearInterval(timer);
        alert('Time is up!');
        resetTimer();
        formatTime(hours, minutes, seconds);
        return;
    }
    // Sorry for triple if statements HUHU!
    /*
        This code will update the time internally,
        as soon as the timer buttons is pressed,
        it will decrement the second first, then if it reaches 0,
        it will then reduce the minute, same logic applies to hours.
    */
    else if(!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            if (minutes > 0) {
                minutes--;
            }
            else {
                minutes = 59;
                if (hours > 0) {
                    hours--;
                }
            }
        }
    }
}

function formatTime(hours, minutes, seconds){
    return `
                ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
            `;
}

export function pauseTimer(){
    isPaused = !isPaused; //We set to true from false

    if (isPaused) {
        clearInterval(timer);
        clicked = false;
        console.log(isPaused);
    }
    // else{
    //     playTimer();
    //     console.log(isPaused);
    // }
}

export function resetTimer(){
    clearInterval(timer);
    hours = 0;
    minutes = 0;
    seconds = 0;
    isPaused = false;
    clicked = false;

    const timerDisplay = document.getElementById("timer")
    timerDisplay.textContent = formatTime(hours, minutes, seconds);
}

export function reduceTime() {
    // Prevent negative time
    if (minutes >= 5) {
        minutes -= 5;
    } else if (hours > 0) {
        hours--;
        minutes = 55 + minutes; // subtracting 5 from 0 = 55
    } else {
        // Already at 00:00, can't reduce
        minutes = 0;
        seconds = 0;
    }

    const timerDisplay = document.getElementById("timer")
    timerDisplay.textContent = formatTime(hours, minutes, seconds);
}

export function plusTime() {
    minutes += 5;

    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }

    

    const timerDisplay = document.getElementById("timer")
    timerDisplay.textContent = formatTime(hours, minutes, seconds);
}