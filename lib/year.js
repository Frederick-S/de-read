'use strict';

var util = require('./util.js');
var number = require('./number.js');

module.exports.read = (function () {
    var read = function (n) {
        if (!util.isNumber(n)) {
            return '';
        }
        
        if (n <= 0) {
            throw new Error('Invalid year.');
        }
        
        if (n > 9999) {
            throw new Error('The number is too big.');
        }
        
        var options = {
            'type': 'year'
        };
        
        if (n >= 1100 && n <= 1999) {
            var hundert = parseInt(n / 100);
            var left = n - hundert * 100;
            return number.read(hundert, options) + 'hundert' + number.read(left, options);
        } else {
            return number.read(n, options);
        }
    };
    
    return read;
})();
