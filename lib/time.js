'use strict';

var util = require('./util.js');
var number = require('./number.js');

module.exports.read = (function () {
    var read = function (hour, minute, official) {
        if (!util.isNumber(hour) || !util.isNumber(minute)) {
            return '';
        }
        
        if (hour < 0 || minute < 0 || hour > 24 || minute > 60) {
            throw new Error('Invalid time.');
        }
        
        if (official) {
            return 'um ' + number.read(hour) + ' Uhr' + (minute > 0 ? ' ' + number.read(minute) : '');
        }
        
        if (minute === 0) {
            return number.read(hour);
        }

        if (minute <= 30) {
            if (minute === 15) {
                return 'Viertel nach ' + number.read(hour); 
            } else if (minute === 30) {
                return 'halb ' + number.read((hour + 1) % 12);
            } else {
                return number.read(minute) + ' nach ' + number.read(hour);
            }
        } else {
            if (minute === 45) {
                return 'Viertel vor ' + number.read((hour + 1) % 12);
            } else {
                return number.read(60 - minute) + ' vor ' + number.read((hour + 1) % 12);
            }
        }
    };
    
    return read;
})();