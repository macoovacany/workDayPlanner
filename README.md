# Work Day Planner

[Example application of the Workday planner](https://macoovacany.github.io/workDayPlanner/)


## Objective 
```md
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```


![Screensot of the workday planner](./assets/images/Screenshot.png)


## architectural decisions

There were two options considered for handling data 
1. HTML text area data ⇔ local storage 
1. HTML text area data ⇔ intermediate variable in workspace ⇔ local storage

Although the later offers additional flexibility in being able manipulate the intermediate values, the former was chosen as it halves the number of manipulation functions.

The default date and time was used in the print out.
