// Inputs
const cldr1 = [['08:00', '08:30'], ["10:00", "10:30"], ['11:30, 12:00'], ["12:00", "12:30"], ["13:00", "13:30"]];
const cldr2 = [["10:30", "11:30"], ["12:00", "12:30"], ["13:00", "13:30"], ['11:30, 12:00'], ['13:30', '14:00'],
['14:00', '14:30'], ['14:30', '15:00']];

function main(duration, c1, c2) {
    const mh = meetingHours(duration, 8, 17);
    let at = mh.map(e => getAvailableTime(e, c1, c2, duration)).filter(e => e.length !== 0);
    /* let at = [];
    mh.forEach(e => {
        let gat = getAvailableTime(e, c1, c2, duration);
        if (gat.length !== 0)
            at.push(gat);
    }); */
    console.log(at);
}

function checkTimeAvailability(t, c1, c2) {
     // t => time (string), c1,c2 => array 
    c1 = c1.every(element => element[0] !== t);
    c2 = c2.every(element => element[0] !== t);
    return (c1 && c2);
}

function getAvailableTime(st, c1, c2, duration) {
    const d = new Date();
    const hrs = parseInt(st.slice(0, 2), 10);
    const mins = parseInt(st.slice(3), 10);
    const m = mins + duration;
    
    // Set meeting end time (et)
    d.setHours(hrs) && d.setMinutes(m);
    const et = d.toTimeString();

    if(checkTimeAvailability(st, c1, c2) && checkTimeAvailability(et, c1, c2)) {
        return [st, et.slice(0, 5)];
    } else {
        return [];  
    }
}

function meetingHours(d, st, et) {
    let hr = "";
    let min = "";
    let a = [];
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



