# Work Day Planner

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


## architectural decisions

There were two options considered for handling data 
1. HTML text area data ⇔ local storage 
1. HTML text area data ⇔ intermediate variable in workspace ⇔ local storage

Although the later offers additional flexibility in being able manipulate the intermediate values, the former was chosen as it halves the number of manipulation functions.

## TODO

1. Get display correct
    1. Page correctly aligned
    1. handles resizing
    1. Get Header and time displayed
        1. sticky the time display?
        1. fix the timezone to use locale instead of $d.
        1. format the date nicely.
    1. time-blocks 
        1. time stamp 
            1. font
            1. alignment
        1. input box
            1. font
            1. alignment
            1. background color
        1. save button
            1. scaling
1. Behaviours
    1. Input box onclick  
    1. save button
    1. save to local storage




Configuration instructions
Installation instructions
Operating instructions
A file manifest (list of files included)
Copyright and licensing information
Contact information for the distributor or programmer
Known bugs[3]
Troubleshooting[3]
Credits and acknowledgments
A changelog (usually for programmers)
A news section (usually for users)


AUTHORS	Credits
THANKS	Acknowledgments
CHANGELOG	A detailed changelog, intended for programmers
NEWS	A basic changelog, intended for users
INSTALL	Installation instructions
COPYING / LICENSE	Copyright and licensing information
BUGS	Known bugs and instructions on reporting new ones
CONTRIBUTING / HACKING	Guide for prospective contributors to the project