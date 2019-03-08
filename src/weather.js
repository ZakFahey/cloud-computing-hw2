const fs = require('fs');
const moment = require('moment');

// Data structure that holds the weather data
let data = {};

function loadData() {
    const dataString = fs.readFileSync('./dailyweather.csv', 'utf8');
    let lines = dataString.split('\n');
    lines.splice(0, 1);
    lines.forEach(l => {
        const vals = l.split(',');
        data[vals[0]] = {
            DATE: vals[0],
            TMAX: parseFloat(vals[1]),
            TMIN: parseFloat(vals[2])
        };
    });
}

loadData();

module.exports.getAllDates = function () {
    return Object.values(data).map(d => ({ DATE: d.DATE}));
};

module.exports.getRecord = function (date) {
    if (!(date in data)) return null;
    return data[date];
};

module.exports.addOrUpdateRecord = function (record) {
    data[record.DATE] = record;
};

module.exports.deleteRecord = function (date) {
    if (!(date in data)) return null;
    const deleted = data[date];
    delete data[date];
    return deleted;
};

module.exports.getForecast = function (date) {
    return null;
};