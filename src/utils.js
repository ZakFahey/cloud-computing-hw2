module.exports.parseDate = function (date) {
    return {
        Y: parseInt(date.substr(0, 4)),
        M: parseInt(date.substr(4, 2)),
        D: parseInt(date.substr(6, 2))
    };
};

module.exports.compareDates = function (date1, date2) {
    const d1 = module.exports.parseDate(date1);
    const d2 = module.exports.parseDate(date2);

    if (d1.Y > d2.Y) return 1;
    if (d1.Y < d2.Y) return -1;
    if (d1.M > d2.M) return 1;
    if (d1.M < d2.M) return -1;
    if (d1.D > d2.D) return 1;
    if (d1.D < d2.D) return -1;
    return 0;
};
