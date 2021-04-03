var $$debug;


// *************************
// html entities to reference
// *************************
const timeDisplay = document.querySelector("#time-display");
var timeBlocksSection = document.querySelector("#times-blocks-section");


// *************************
// timer stuff
// *************************
TIMER_UPDATE_FREQ = 200; // checks every fifth of second if the time has changed 
var timerInterval = setInterval(function() {

    // TODO: use the dayjs timezone extension to fix
    timeDisplay.innerText = dayjs().$d;
}, TIMER_UPDATE_FREQ);



// **************************************************
// dynamically generated  initial html
// **************************************************
const makeTimeBlockFormHTML = function(time) {
    // am/pm --> 24 hour
    // TODO: find the library routine to do this
    let slicePnt = time.length - 2;
    hour = time.slice(0, slicePnt)
    ampm = time.slice(slicePnt)
    if (ampm === "pm") {
        hour = hour % 12 + 12;
    }

    return `<form  data-status="unlocked"  data-hour="${hour}" class="time-blocks-form" id="${time}-form">
<label for="${time}-text"> ${time} </label>
<textarea form="${time}-form" id="${time}-text" name="${time}-text" rows="3" cols=
"50"></textarea>
<button type="button" id="${time}-submit">💾</button>
</form>`;
}

const makeAllTimeBlockForms = function() {
    // this builds a single innerHTML element because I don't want to play around lots of document.createelements.
    var TimeBlocksSectionInnnerHTML = "";
    const timeSections = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
    timeSections.forEach((timeElement) => {
        TimeBlocksSectionInnnerHTML = TimeBlocksSectionInnnerHTML.concat(makeTimeBlockFormHTML(timeElement));
    });
    return TimeBlocksSectionInnnerHTML;
}


// *************************
// update the time block ui
// *************************
const updateTimeBlocks = function() {
    timeBlocksSection.childNodes.forEach((f) => {

        let txtar = f.querySelector("textarea");

        if (f.dataset.hour == dayjs().$d.getHours()) {
            // present
            txtar.style.backgroundColor = "var(--present)";

        } else if (f.dataset.hour < dayjs().$d.getHours()) {
            // show as past and lock
            f.dataset.status = "locked";
            txtar.style.backgroundColor = "var(--past)";
            txtar.readOnly = true;

        } else {
            // use the default values for in the future timeblock
        }
    });
}

// *************************
// event listeners
// *************************

timeBlocksSection.addEventListener("click", (e) => {
    // if (e.target && e.target.nodeName==="button") 
    console.log(e.target.nodeName);
})


//  generate initial html format
timeBlocksSection.innerHTML = makeAllTimeBlockForms();
updateTimeBlocks();