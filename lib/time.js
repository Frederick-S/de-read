'use strict';

var util = require('./util.js');
var number = require('./number.js');

module.exports.read = (function () {
    var read = function (hour, minute, official) {
        if (official) {
            return 'um ' + number.read(hour) + ' Uhr' + (minute > 0 ? ' ' + number.read(minute) : '');
        } else {
            
        }
    };
    
    return read;
})();