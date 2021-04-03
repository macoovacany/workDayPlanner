TIMER_UPDATE_FREQ = 200; // checks every fifth of second if the time has changed 

// *************************
// html entities to reference
// *************************
const timeDisplay = document.querySelector("#time-display");
var timeBlocksSection = document.querySelector("#times-blocks-section");


// *************************
// timer stuff
// *************************
var timerInterval = setInterval(function() {

    // TODO: use the dayjs timezone extension to fix
    timeDisplay.innerText = dayjs().$d;
}, TIMER_UPDATE_FREQ);

const makeTimeBlockFormHTML = function(time) {
    return `<form  data-status="unlocked" class="time-blocks-form" id="${time}">
<label for="${time}-text"> ${time} </label>
<input type="text" id="${time}-text" name="${time}-text">
<button id="${time}-submit">💾</button>
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

//  initial html format
const init_html = function() {
    timeBlocksSection.innerHTML = makeAllTimeBlockForms();
}

init_html();