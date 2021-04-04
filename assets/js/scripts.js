// global variables 
const timeSections = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
const TIME_FORMAT = "YYYY-M-D HH:mm:ss";

BUTTON_NONE = "";
BUTTON_LOCKED = "🔒";
BUTTON_SAVE = "💾";

// *************************
// localstorage ket
//  
// *************************
STORAGE_KEY = "workPlannerData";


// *************************
// html entities to reference
// *************************
const timeDisplay = document.querySelector("#time-display");
var timeBlocksSection = document.querySelector("#times-blocks-section");



// *************************
// timer stuff
// *************************
const TIMER_UPDATE_FREQ = 200; // checks every fifth of second if the time has changed .
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
    let hour = time.slice(0, slicePnt);
    let ampm = time.slice(slicePnt);
    if (ampm === "pm") {
        hour = hour % 12 + 12;
    }

    return `<form  data-status="unlocked"  data-hour="${hour}" class="time-blocks-form" id="${time}-form">
<label for="${time}-text"> ${time} </label>
<textarea form="${time}-form" id="${time}-text" name="${time}-text" rows="3" cols=
"50"></textarea>
<button type="button" id="${time}-submit"></button>
</form>`;
};

const makeAllTimeBlockForms = function() {
    // this builds a single innerHTML element because I don't want to play around lots of document.createelements.
    var TimeBlocksSectionInnnerHTML = "";
    timeSections.forEach((timeElement) => {
        TimeBlocksSectionInnnerHTML = TimeBlocksSectionInnnerHTML.concat(makeTimeBlockFormHTML(timeElement));
    });
    return TimeBlocksSectionInnnerHTML;
};


// *************************
// local storage manipulation
// *************************
// text area data <-> localstorage.workPlannerData
const loadWPD = function() {

    let wpd = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // default empty work planner data if not already in storage.
    if (wpd === null) {
        newWPD();
    } else {

        // update the html elements to have the correct data    
        timeSections.forEach((tb) => {
            let txtar = document.getElementById(`${tb}-text`);
            txtar.value = wpd[tb];
        })
    };
}

const saveAllWPD = function() {
    // use a local object for storage
    var wpd = {};
    wpd['date'] = dayjs().format(TIME_FORMAT);

    timeSections.forEach((tb) => {
        let txtar = document.getElementById(`${tb}-text`);
        wpd[tb] = txtar.value;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(wpd));
}


const saveUpdateWPD = function(tb) {
    let wpd = JSON.parse(localStorage.getItem(STORAGE_KEY));
    wpd['date'] = dayjs().format(TIME_FORMAT);

    let txtar = document.getElementById(`${tb}-text`);
    wpd[tb] = txtar.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wpd));
}



const newWPD = function() {
    var wpd = {};
    wpd['date'] = dayjs().format(TIME_FORMAT);

    timeSections.forEach((tb) => {
        wpd[tb] = "";
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(wpd));
}


// *************************
// update the time block ui
// *************************
const updateTimeBlocks = function() {
    loadWPD()

    updateTime = new dayjs();


    timeBlocksSection.childNodes.forEach((f) => {

        let txtar = f.querySelector("textarea");
        let but = f.querySelector("button");

        if (f.dataset.hour == updateTime.$d.getHours()) {
            // present
            txtar.style.backgroundColor = "var(--present)";
            but.innerText = BUTTON_NONE;

        } else if (f.dataset.hour < updateTime.$d.getHours()) {
            // show as past and lock
            f.dataset.status = "locked";
            txtar.style.backgroundColor = "var(--past)";
            txtar.readOnly = true;
            but.innerText = BUTTON_LOCKED;

        } else {
            // use the default values for in the future timeblock
        }
    });
};



// *************************
// event listeners
// *************************

// 
timeBlocksSection.addEventListener("click", (e) => {

    let tgt = e.target;
    let updateHour = tgt.id.split('-')[0];

    switch (tgt.nodeName) {
        // update the button text depending on if a text area has focus
        case "TEXTAREA":
            // TODO: add an event listener for when the textare is changed:
            // FORNOW: just change the button to indicate save
            let button = document.getElementById(`${updateHour}-submit`)
            if (button.innerText === BUTTON_NONE) {
                button.innerText = BUTTON_SAVE;
            };
            // else the button is "locked"
            break

        case "BUTTON":
            if (tgt.innerText === BUTTON_SAVE) {
                saveUpdateWPD(updateHour);
                tgt.innerText = BUTTON_NONE;
            }
            break;
    }
});



//  generate initial html format
timeBlocksSection.innerHTML = makeAllTimeBlockForms();

updateTimeBlocks();

// run check if the web page time has run over to the next block
document.addEventListener("focus", () => {
    // check we have data in storage
    updateTimeBlocks;
});

// end