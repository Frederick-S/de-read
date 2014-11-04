'use strict';

var util = module.exports.util = (function () {
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
        numberLength: numberLength,
        isNumber: isNumber
    };
    
    return util;
})();

module.exports.number = (function () {
    var numbers = {
        '0': 'null',
        '1': 'ein',
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
        
    }
    
    function threeDigits(n) {
        
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
        
        if (isPlural && index !== 0) {
            if (index === 1 || index === 3) {
                return suffix + 'en';
            } else if (index === 2) {
                return suffix + 'n';
            }
        } else {
            return suffix;
        }
    }
    
    var number = function (n) {
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
    
    return number;
})();

module.exports.year = function (year) {
    
};

module.exports.time = function (hour, minute) {
    
};
