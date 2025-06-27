let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let isPaused = false;
let clicked = false;

// Default Audio
let audioAlarm = new Audio('../../assets/audio/arriving.mp3');

// For Session Storage, to persist current timer
let timerData = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPaused: false,
    clicked: false,
};

export function playTimer(){
    if (!clicked) {
        timer = setInterval(() => {
            updateTimer();
        }, 1000);
        
        isPaused = false;
        clicked = true;
        if(hours === 0 && minutes == 0 && seconds == 0){
            clearInterval(timer);
            
            Swal.fire({
                title: "Set a time!",
                icon: "warning",
                timer: 1000,
                showConfirmButton: false,
                // backdrop: false,
                width: '20em'
            });
            resetTimer();
            formatTime(hours, minutes, seconds);
            audioAlarm.play();
            return;
        }

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Timer Starts",
            showConfirmButton: false,
            timer: 1500,
            backdrop: false,
            width: '20em'
        });
    }
    console.log(clicked);
}

export function updateTimer(){
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = formatTime(hours, minutes, seconds);
    
        timerData.hours = hours;
        timerData.minutes = minutes;
        timerData.seconds = seconds;
        timerData.isPaused = isPaused;
        timerData.clicked = clicked;
        sessionStorage.setItem("current_time", JSON.stringify(timerData));

    
    if(hours === 0 && minutes == 0 && seconds == 0){
        clearInterval(timer);
        audioAlarm.loop = true;
        audioAlarm.play();
        Swal.fire({
            title: "Time's Up!",
            icon: "warning",
            // timer: 1000,
            showConfirmButton: false,
            showCancelButton: true,
            // backdrop: false,
            width: '20em'
        }).then((result) => {
            
            if (result.dismiss === Swal.DismissReason.cancel) {
                audioAlarm.loop = false;
                audioAlarm.pause();
            }
        })
        resetTimer();
        formatTime(hours, minutes, seconds);
        notifyMe();
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
        audioAlarm.loop = false;
    }

    audioAlarm.loop = false;
}

export function restoreTimer(){
    const savedTime = sessionStorage.getItem("current_time");
    if (savedTime) {
        const timeData = JSON.parse(savedTime);
        hours = timeData.hours;
        minutes = timeData.minutes;
        seconds = timeData.seconds;
        isPaused = timeData.isPaused;
        clicked = timeData.clicked;

        const timerDisplay = document.getElementById("timer");
        timerDisplay.textContent = formatTime(hours, minutes, seconds);

        // If timer was previously running, resume it
        if (!isPaused && clicked && (hours > 0 || minutes > 0 || seconds > 0)) {
            timer = setInterval(() => {
                updateTimer();
            }, 1000);
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

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Paused!",
            showConfirmButton: false,
            timer: 1500,
            backdrop: false,
            width: '20em'
        });

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

    sessionStorage.removeItem("current_time");
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

function notifyMe() {
    let notification = '';

    if (Notification.permission == 'granted') {
        notification = new Notification(
            "Time's Up!"
        )
    }

}
