
const yearsDiffFromNow = date => {
    let diff = Date.now() - Date.parse(date);
    diff = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
    return diff;
};

const monthesDiff = (dateHigh, dateLow) => {
    let diff = Date.parse(dateHigh) - Date.parse(dateLow);
    diff = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
    return diff;
};

export { yearsDiffFromNow, monthesDiff };