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
    
    function NumberNode(number, nodeType) {
        this.number = number;
        this.nodeType = nodeType;
        this.next = null;
    }
    
    function processNumber(n) {
        var pattern = /(\d{1,3})(?=(\d{3})*$)/g;
        var matches = n.toString().match(pattern);
        var head = null;
        var prev = null;
        
        if (matches) {
            var length = matches.length;
            var nodeTypes = ['default', 'tausend', 'million', 'milliarde', 'billion'];
            
            matches.map(function (item, index) {
                var number = parseInt(item);
                var nodeType = nodeTypes[length - 1 - index];
                var node = new NumberNode(number, nodeType);
                
                if (head === null) {
                    head = node;
                }
                
                if (prev === null) {
                    prev = node;
                } else {
                    prev.next = node;
                }
            });
            
            return head;
        } else {
            return null;
        }
    }
    
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
        if (n === 100) {
            return 'hundert';
        }
        
        var hundert = parseInt(n / 100);
        var hundertPart = (hundert === 1 ? '' : numbers[hundert]) + 'hundert';
        var left = n - 100 * hundert;
        var length = util.numberLength(left);
        
        if (length === 2) {
            return hundertPart + twoDigits(left);
        } else if (length === 1) {
            return hundertPart + oneDigit(left);
        }
    }
    
    function DefaultProcessor(successor) {
        this.successor = successor;
    }
    
    DefaultProcessor.prototype.process = function (node) {
        if (!node) {
            return '';
        }
        
        var length = util.numberLength(node.number);
        
        switch (length) {
            case 1:
                return oneDigit(node.number);
            case 2:
                return twoDigits(node.number);
            case 3:
                return threeDigits(node.number);
            default:
                return '';
        }
    };
    
    var read = function (n) {
        if (!util.isNumber(n)) {
            return '';
        }
        
        if (n > 999999999999999) {
            throw new Error('The number is too big.');
        }
        
        var head = processNumber(n);
        
        if (head) {
            var processor = new DefaultProcessor();
            
            return processor.process(head);
        } else {
            return '';
        }
    };
    
    return read;
})();