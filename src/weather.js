const fs = require('fs');
const utils = require('./utils');

// Data structure that holds the weather data
let data;

function loadData() {
    const dataString = fs.readFileSync('./dailyweather.csv', 'utf8');
    let lines = dataString.split('\n');
    lines.splice(0, 1);
    data = lines.map(l => {
        const vals = l.split(',');
        return {
            DATE: vals[0],
            TMAX: parseFloat(vals[1]),
            TMIN: parseFloat(vals[2])
        };
    });
}

function insertRecordInOrder(record) {
    if (utils.compareDates(record.DATE, data[data.length - 1].DATE) > 0) {
        data.push(record);
    }
    let insert = data.findIndex((d, i) => {
        if (i === 0 && utils.compareDates(record.DATE, d.DATE) < 0) return true;
        return utils.compareDates(record.DATE, d.DATE) >= 0 && utils.compareDates(record.DATE, data[i + 1].DATE) < 0;
    });
    data.splice(insert, 0, record);
}

loadData();

module.exports.getAllDates = function () {
    return data.map(d => ({ DATE: d.DATE}));
};

module.exports.getRecord = function (date) {
    const record = data.find(d => d.DATE === date);
    if (record === undefined) return null;
    return record;
};

module.exports.addOrUpdateRecord = function (record) {
    const existingEntry = data.findIndex(d => d.DATE === record.DATE);
    if (existingEntry >= 0) {
        data[existingEntry] = record;
    } else {
        insertRecordInOrder(record);
    }
};

module.exports.deleteRecord = function (date) {
    const index = data.findIndex(d => d.DATE === date);
    if (index < 0) return null;
    const deleted = data[index];
    data.splice(index, 1);
    return deleted;
};

module.exports.getForecast = function (date) {
    return null;
};