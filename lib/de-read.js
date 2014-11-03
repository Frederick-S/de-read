function numberLength(n) {
    if (isNumber(n)) {
        // Source: http://mathworld.wolfram.com/NumberLength.html
        return n === 0 ? 1 : Math.floor(Math.log(n) / Math.log(10)) + 1;
    } else {
        return -1;
    }
}

function isNumber(n) {
    return typeof n === 'number';
}

var util = {
    numberLength: numberLength
}

module.exports.util = util;

module.exports.time = function (hour, minute) {
    
};

module.exports.year = function (year) {
    
};

module.exports.number = function (number) {
    
};