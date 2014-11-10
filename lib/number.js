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
    
    function areLeftNodesZero(node) {
        while (node) {
            if (node.number !== 0) {
                return false;
            }
            
            node = node.next;
        }
        
        return true;
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
                    prev = head;
                } else {
                    prev.next = node;
                    prev = node;
                }
            });
            
            return head;
        } else {
            return null;
        }
    }
    
    function DefaultProcessor(successor) {
        this.successor = successor;
        this.readZero = true;
        this.type = 'default';
        this.singularPrefix = 'eins';
        this.singularSuffix = '';
        this.pluralSuffix = '';
        this.eins = 'eins';
        this.addSpaceBeforeNextNode = false;
    }
    
    DefaultProcessor.prototype.oneDigit = function (n) {
        return (n === 1 ? this.singularPrefix : numbers[n]) + (n > 1 ? this.pluralSuffix : this.singularSuffix);
    };
    
    DefaultProcessor.prototype.twoDigits = function (n) {
        var s = '';
        
        if (n < 20) {
            s = numbers[n];
        } else {
            var firstInteger = parseInt(n / 10);
            var secondInteger = n % 10;

            if (secondInteger === 0) {
                s = numbers[n];
            } else {
                s = (secondInteger === 1 ? 'ein' : numbers[secondInteger]) + 'und' + numbers[firstInteger + '0'];
            }
        }
        
        return s + this.pluralSuffix;
    };
    
    DefaultProcessor.prototype.threeDigits = function (n) {
        if (n === 100) {
            return 'hundert' + this.pluralSuffix;
        } else {
            var hundert = parseInt(n / 100);
            var hundertPart = (hundert === 1 ? '' : numbers[hundert]) + 'hundert';
            var left = n - 100 * hundert;
            var leftLength = util.numberLength(left);

            if (leftLength === 2) {
                return hundertPart + this.twoDigits(left);
            } else if (leftLength === 1) {
                return left === 1 ? hundertPart + this.eins + this.pluralSuffix : hundertPart + this.oneDigit(left);
            }
        }
    };
    
    DefaultProcessor.prototype.process = function (node) {
        if (!node) {
            return '';
        }
        
        if (node.nodeType === this.type) {
            if (!this.readZero && node.number === 0) {
                return this.successor ? this.successor.process(node.next) : '';
            }
            
            var s = '';
            var length = util.numberLength(node.number);

            switch (length) {
                case 1:
                    s = this.oneDigit(node.number);
                    break;
                case 2:
                    s = this.twoDigits(node.number);
                    break;
                case 3:
                    s = this.threeDigits(node.number);
                    break;
                default:
                    s = '';
                    break;
            }
            
            if (this.addSpaceBeforeNextNode && !areLeftNodesZero(node.next)) {
                s += ' ';
            }
            
            return this.successor && !areLeftNodesZero(node.next) ? s + this.successor.process(node.next) : s;
        } else {
            return this.successor ? this.successor.process(node) : '';
        }
    };
    
    function TausendProcessor(successor) {
        this.successor = successor;
        this.readZero = false;
        this.type = 'tausend';
        this.singularPrefix = '';
        this.singularSuffix = 'tausend';
        this.pluralSuffix = 'tausend';
        this.eins = 'ein';
        this.addSpaceBeforeNextNode = false;
    }
    
    TausendProcessor.prototype = DefaultProcessor.prototype;
    TausendProcessor.prototype.constructor = TausendProcessor;
    
    function MillionProcessor(successor) {
        this.successor = successor;
        this.readZero = false;
        this.type = 'million';
        this.singularPrefix = 'eine';
        this.singularSuffix = ' Million';
        this.pluralSuffix = ' Millionen';
        this.eins = 'ein';
        this.addSpaceBeforeNextNode = true;
    }
    
    MillionProcessor.prototype = DefaultProcessor.prototype;
    MillionProcessor.prototype.constructor = MillionProcessor;
    
    function MilliardeProcessor(successor) {
        this.successor = successor;
        this.readZero = false;
        this.type = 'milliarde';
        this.singularPrefix = 'eine';
        this.singularSuffix = ' Milliarde';
        this.pluralSuffix = ' Milliarden';
        this.eins = 'ein';
        this.addSpaceBeforeNextNode = true;
    } 
    
    MilliardeProcessor.prototype = DefaultProcessor.prototype;
    MilliardeProcessor.prototype.constructor = MilliardeProcessor;
    
    function BillionProcessor(successor) {
        this.successor = successor;
        this.readZero = false;
        this.type = 'billion';
        this.singularPrefix = 'eine';
        this.singularSuffix = ' Billion';
        this.pluralSuffix = ' Billionen';
        this.eins = 'ein';
        this.addSpaceBeforeNextNode = true;
    }
    
    BillionProcessor.prototype = DefaultProcessor.prototype;
    BillionProcessor.prototype.constructor = BillionProcessor;
    
    var read = function (n) {
        if (!util.isNumber(n)) {
            return '';
        }
        
        if (n > 999999999999999) {
            throw new Error('The number is too big.');
        }
        
        var head = processNumber(n);
        
        if (head) {
            var processor = new BillionProcessor(new MilliardeProcessor(new MillionProcessor(new TausendProcessor(new DefaultProcessor()))));
            
            return processor.process(head);
        } else {
            return '';
        }
    };
    
    return read;
})();