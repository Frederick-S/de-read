'use strict';

var util = require('./util.js');

module.exports.read = (function () {
    var numbers = {
        '0': 'null',
        '1': 'eins',
        '2': 'zwei',
        '3': 'drei',
        '4': 'vier',
        '5': 'fünf',
        '6': 'sechs',
        '7': 'sieben',
        '8': 'acht',
        '9': 'neun',
        '10': 'zehn',
        '11': 'elf',
        '12': 'zwölf',
        '13': 'dreizehn',
        '14': 'vierzehn',
        '15': 'fünfzehn',
        '16': 'sechzehn',
        '17': 'siebzehn',
        '18': 'achtzehn',
        '19': 'neunzehn',
        '20': 'zwanzig',
        '30': 'dreißig',
        '40': 'vierzig',
        '50': 'fünfzig',
        '60': 'sechzig',
        '70': 'siebzig',
        '80': 'achtzig',
        '90': 'neunzig'
    };
    
    function oneDigit(n) {
        return numbers[n];
    }
    
    function twoDigits(n) {
        if (n < 20) {
            return numbers[n];
        } else {
            var firstInteger = parseInt(n / 10);
            var secondInteger = n % 10;

            if (secondInteger === 0) {
                return numbers[n];
            } else {
                return (secondInteger === 1 ? 'ein' : numbers[secondInteger]) + 'und' + numbers[firstInteger + '0'];
            }
        }
    }
    
    function threeDigits(n) {
        //var firstInteger = parseInt(n / 100);
        //var left = n - firstInteger * 100;
        
    }
    
    function parse(n) {
        var length = util.numberLength(n);
        
        switch (length) {
            case 1:
                return oneDigit(n);
            case 2:
                return twoDigits(n);
            case 3:
                return threeDigits(n);
            default:
                return '';
        }
    }
    
    var numberSuffixes = ['tausend', 'Million', 'Milliarde', 'Billion'];
    
    function getNumberSuffixes(index, isPlural) {
        var suffix = numberSuffixes[index];
        
        if (index === 0) {
            return suffix;
        } else {
            if (isPlural) {
                if (index === 1 || index === 3) {
                    return ' ' + suffix + 'en ';
                } else if (index === 2) {
                    return ' ' + suffix + 'n ';
                }
            } else {
                return ' ' + suffix + ' ';
            }
        }
    }
    
    var read = function (n) {
        if (!util.isNumber(n)) {
            return '';
        }
        
        if (n > 999999999999999) {
            throw new Error('The number is too big.');
        }
        
        var pattern = /(\d{1,3})(?=(\d{3})*$)/g;
        var matches = n.toString().match(pattern);
        
        if (matches) {
            var matchesLength = matches.length;
            return matches.map(function (item, index) {
                var n = parseInt(item);
                var temp = matchesLength - 2 - index;
                
                if (temp >= 0) {
                    return parse(n) + getNumberSuffixes(temp, n > 1);
                } else {
                    return parse(n);
                }
            }).join('');
        } else {
            return '';
        }
    };
    
    return read;
})();