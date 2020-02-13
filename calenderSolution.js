/* 
Calender challenge 
Given the calenders of two persons seeking to schedule an appointment say via google calender. 
Assume the following inputs. 
1. cldr1 and cldr2 are a list of busy unavailable time blocks in each calender
2. max duration of a meeting is 30mins
3. Office working hours is from 8AM(08:00) to 5:30PM(17:00)

Write a program to output to console a list(array) of possible meeting times e,g [[08:00, 08:30], [10:30, 11:00]]

**/


// Inputs
const cldr1 = [['08:00', '08:30'], ["10:00", "10:30"], ['11:30, 12:00'], ["12:00", "12:30"], ["13:00", "13:30"] ];
const cldr2 = [["10:30", "11:30"], ["12:00", "12:30"], ["13:00", "13:30"], ['11:30, 12:00'], ['13:30', '14:00'],
    ['14:00', '14:30'],['14:30', '15:00']];

/*** Begin code here */
function main(duration, c1, c2) {
    const mh = meetingHours(duration, 8, 17);
    let at = []; // at => avaialble times
    mh.forEach(e => {
        let gat = getAvailableTime(e, c1, c2, duration);
        if (gat.length !== 0)
            at.push(gat);
    });
    console.log(at);
}

/*** Helper functions */

/** 
 * @params t => time (string)
 * @params c1,c2 => calender (array)
 * @returns Boolean
 * 
 *
 * This function determines availability of a given time based on a 
 * list of busy blocks of time in the calenders returns true if given time is free and available
 * (i.e not in list) and false otherwise
 */
function checkTimeAvailability(t, c1, c2) {
    c1 = c1.every(element => element[0] != t);
    c2 = c2.every(element => element[0] != t);
    return (c1 && c2);
}

/**
 * st - meeting start time(string)
 * et - meeting end time(string)
 * c1 - calender1 - unavailabity times(array)
 * c2 - calender2 - unavailabity times(array)
 * @returns array
 *
 *
 * This function builds and returns an array of availabile start and end times based on a
 * list of busy blocks of time in the calenders returns an array if given time is free and available
 * (i.e not in list) or an empty array otherwise
 */
function getAvailableTime(st, c1, c2, duration) {
    
    d = new Date();
    hrs = parseInt(st.slice(0, 2));
    mins = parseInt(st.slice(3));
    m = mins + duration;

    // Set meeting end time (et)
    d.setHours(hrs) && d.setMinutes(m);
    et = d.toTimeString();

    //Do check to see if both proposed start times and end times are valid 
    // if so build the array and return it as value
    if (checkTimeAvailability(st, c1, c2) && checkTimeAvailability(et, c1, c2)) {
        return [st, et.slice(0, 5)];
    } else {
        return [];
    }

}

/**
 * @params t => time (string)
 * @params c1,c2 => calender (array)
 * @returns Boolean
 *
 *
 * This function determines availability of a given time based on a
 * list of busy blocks of time in the calenders returns true if given time is free and available
 * (i.e not in list) and false otherwise
 */

function meetingHours(d, st, et) {
    // d => meeting duration(mins)
    // wh => official work hours(hrs)
    let hr = "";
    let min = "";
    a = [];
    for (let i = st; i < et; i++) {
        hr = addZero(i);
        for (let j = 0; j < 60; j = j + d) {
            min = addZero(j);
            a.push(hr + ':' + min);
        }
    }
    return a;
}

function addZero(i) {
    if (i < 10) {
        return '0' + i;
    } else {
        return i;
    }
}


// initialize application
main(30, cldr1, cldr2);



