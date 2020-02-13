// Inputs
const cldr1 = [['08:00', '08:30'], ["10:00", "10:30"], ['11:30, 12:00'], ["12:00", "12:30"], ["13:00", "13:30"]];
const cldr2 = [["10:30", "11:30"], ["12:00", "12:30"], ["13:00", "13:30"], ['11:30, 12:00'], ['13:30', '14:00'],
['14:00', '14:30'], ['14:30', '15:00']];

function main(duration, c1, c2) {
    const mh = meetingHours(duration, 8, 17);
    let at = [];
    mh.forEach(e => {
        let gat = getAvailableTime(e, c1, c2, duration);
        if (gat.length !== 0)
            at.push(gat);
    });
    console.log(at);
}

function checkTimeAvailability(t, c1, c2) {
     // t => time (string), c1,c2 => array 
    c1 = c1.every(element => element[0] != t);
    c2 = c2.every(element => element[0] != t);
    return (c1 && c2);
}

function getAvailableTime(ts, c1, c2, duration) {
    d = new Date();
    hrs = parseInt(ts.slice(0, 2));
    mins = parseInt(ts.slice(3));
    m = mins + duration;
    
    // Set meeting end time (te)
    d.setHours(hrs) && d.setMinutes(m);
    te = d.toTimeString();

    if(checkTimeAvailability(ts, c1, c2) && checkTimeAvailability(te, c1, c2)) {
        return [ts, te.slice(0, 5)];
    } else {
        return [];  
    }
}

function meetingHours(d, st, et) {
    let hr = "";
    let min = "";
    a = [];
    for(let i = st; i < et; i++) {
        hr = addZero(i);
        for (let j = 0; j < 60; j= j + d) {
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



