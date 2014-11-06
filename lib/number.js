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
        
        if (node.nodeType === 'default') {
            var s = '';
            var length = util.numberLength(node.number);
        
            switch (length) {
                case 1:
                    s = oneDigit(node.number);
                    break;
                case 2:
                    s = twoDigits(node.number);
                    break;
                case 3:
                    s = threeDigits(node.number);
                    break;
                default:
                    s = '';
                    break;
            }
            
            return this.successor ? s + this.successor.process(node.next) : s;
        } else {
            return this.successor ? this.successor.process(node) : '';
        }
    };
    
    function TausendProcessor(successor) {
        this.successor = successor;
    }
    
    TausendProcessor.prototype.process = function (node) {
        if (!node) {
            return '';
        }
        
        if (node.nodeType === 'tausend') {
            if (node.number === 0) {
                return this.successor ? this.successor.process(node.next) : '';
            }

            var s = '';
            var length = util.numberLength(node.number);
        
            switch (length) {
                case 1:
                    s = (node.number === 1 ? '' : oneDigit(node.number)) + 'tausend';
                    break;
                case 2:
                    s = twoDigits(node.number) + 'tausend';
                    break;
                case 3:
                    if (node.number === 100) {
                        s = 'hundert';
                    } else {
                        var hundert = parseInt(node.number / 100);
                        var hundertPart = (hundert === 1 ? '' : numbers[hundert]) + 'hundert';
                        var left = node.number - 100 * hundert;
                        var lefLength = util.numberLength(left);

                        if (lefLength === 2) {
                            s = hundertPart + twoDigits(left);
                        } else if (lefLength === 1) {
                            s = left === 1 ? hundertPart + 'ein' : hundertPart + oneDigit(left);
                        }
                    }
                    
                    s += 'tausend';
                    break;
                default:
                    s = '';
                    break;
            }
            
            return this.successor && !areLeftNodesZero(node.next) ? s + this.successor.process(node.next) : s;
        } else {
            return this.successor ? this.successor.process(node) : '';
        }
    };
    
    function MillionProcessor(successor) {
        this.successor = successor;
    }
    
    MillionProcessor.prototype.process = function (node) {
        if (!node) {
            return '';
        }
        
        if (node.nodeType === 'million') {
            if (node.number === 0) {
                return this.successor ? this.successor.process(node.next) : '';
            }
            
            var s = '';
            var length = util.numberLength(node.number);
        
            switch (length) {
                case 1:
                    s = (node.number === 1 ? 'eine' : oneDigit(node.number)) + ' Million';
                    
                    if (node.number > 1) {
                        s += 'en';
                    }
                    
                    break;
                case 2:
                    s = twoDigits(node.number) + ' Millionen';
                    break;
                case 3:
                    if (node.number === 100) {
                        s = 'hundert';
                    } else {
                        var hundert = parseInt(node.number / 100);
                        var hundertPart = (hundert === 1 ? '' : numbers[hundert]) + 'hundert';
                        var left = node.number - 100 * hundert;
                        var lefLength = util.numberLength(left);

                        if (lefLength === 2) {
                            s = hundertPart + twoDigits(left);
                        } else if (lefLength === 1) {
                            s = left === 1 ? hundertPart + 'ein' : hundertPart + oneDigit(left);
                        }
                    }
                    
                    s += ' Millionen';
                    break;
                default:
                    s = '';
                    break;
            }
            
            if (!areLeftNodesZero(node.next)) {
                s += ' ';
            }
            
            return this.successor && !areLeftNodesZero(node.next) ? s + this.successor.process(node.next) : s;
        } else {
            return this.successor ? this.successor.process(node) : '';
        }
    };
    
    function MilliardeProcessor(successor) {
        this.successor = successor;
    }
    
    MilliardeProcessor.prototype.process = function (node) {
        if (!node) {
            return '';
        }
        
        if (node.nodeType === 'milliarde') {
            if (node.number === 0) {
                return this.successor ? this.successor.process(node.next) : '';
            }
            
            var s = '';
            var length = util.numberLength(node.number);
        
            switch (length) {
                case 1:
                    s = (node.number === 1 ? 'eine' : oneDigit(node.number)) + ' Milliarde';
                    
                    if (node.number > 1) {
                        s += 'n';
                    }
                    
                    break;
                case 2:
                    s = twoDigits(node.number) + ' Milliarden';
                    break;
                case 3:
                    if (node.number === 100) {
                        s = 'hundert';
                    } else {
                        var hundert = parseInt(node.number / 100);
                        var hundertPart = (hundert === 1 ? '' : numbers[hundert]) + 'hundert';
                        var left = node.number - 100 * hundert;
                        var lefLength = util.numberLength(left);

                        if (lefLength === 2) {
                            s = hundertPart + twoDigits(left);
                        } else if (lefLength === 1) {
                            s = left === 1 ? hundertPart + 'ein' : hundertPart + oneDigit(left);
                        }
                    }
                    
                    s += ' Milliarden';
                    break;
                default:
                    s = '';
                    break;
            }
            
            if (!areLeftNodesZero(node.next)) {
                s += ' ';
            }
            
            return this.successor && !areLeftNodesZero(node.next) ? s + this.successor.process(node.next) : s;
        } else {
            return this.successor ? this.successor.process(node) : '';
        }
    };
    
    function BillionProcessor(successor) {
        this.successor = successor;
    }
    
    BillionProcessor.prototype.process = function (node) {
        if (!node) {
            return '';
        }
        
        if (node.nodeType === 'billion') {
            if (node.number === 0) {
                return this.successor ? this.successor.process(node.next) : '';
            }
            
            var s = '';
            var length = util.numberLength(node.number);
        
            switch (length) {
                case 1:
                    s = (node.number === 1 ? 'eine' : oneDigit(node.number)) + ' Billion';
                    
                    if (node.number > 1) {
                        s += 'en';
                    }
                    
                    break;
                case 2:
                    s = twoDigits(node.number) + ' Billionen';
                    break;
                case 3:
                    if (node.number === 100) {
                        s = 'hundert';
                    } else {
                        var hundert = parseInt(node.number / 100);
                        var hundertPart = (hundert === 1 ? '' : numbers[hundert]) + 'hundert';
                        var left = node.number - 100 * hundert;
                        var lefLength = util.numberLength(left);

                        if (lefLength === 2) {
                            s = hundertPart + twoDigits(left);
                        } else if (lefLength === 1) {
                            s = left === 1 ? hundertPart + 'ein' : hundertPart + oneDigit(left);
                        }
                    }
                    
                    s += ' Billionen';
                    break;
                default:
                    s = '';
                    break;
            }
            
            if (!areLeftNodesZero(node.next)) {
                s += ' ';
            }
            
            return this.successor && !areLeftNodesZero(node.next) ? s + this.successor.process(node.next) : s;
        } else {
            return this.successor ? this.successor.process(node) : '';
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
            var processor = new BillionProcessor(new MilliardeProcessor(new MillionProcessor(new TausendProcessor(new DefaultProcessor()))));
            
            return processor.process(head);
        } else {
            return '';
        }
    };
    
    return read;
})();