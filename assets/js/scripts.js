TIMER_UPDATE_FREQ = 200; // checks every fifth of second if the time has changed 
timeDisplay = document.querySelector("#time-display");
const timeZoneOffset = new Date().getTimezoneOffset();


var timerInterval = setInterval(function() {

    // TODO: use the dayjs timezone extension to fix
    timeDisplay.innerText = dayjs().$d;
}, TIMER_UPDATE_FREQ);