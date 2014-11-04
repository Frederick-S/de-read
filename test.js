var assert = require('assert');
var read = require('./lib/de-read.js');
var numberLength = read.util.numberLength;

describe('Number length', function () {
    it('Not a number', function () {
        assert.equal(-1, numberLength('abc'));
    });
    
    for (var i = 0; i <= 9; i++) {
        it('The length of number ' + i + ' is 1', (function (j) {
            return function () {
                assert.equal(1, numberLength(j));
            }
        })(i));
    }
    
    for (var i = 10; i <= 99; i++) {
        it('The length of number ' + i + ' is 2', (function (j) {
            return function () {
                assert.equal(2, numberLength(j));
            }
        })(i));
    }
    
    for (var i = 100; i <= 999; i++) {
        it('The length of number ' + i + ' is 3', (function (j) {
            return function () {
                assert.equal(3, numberLength(j));
            }
        })(i));
    }
});

describe('Read number', function () {
    it('0', function () {
       assert.equal('null', read.number(0)); 
    });
    
    it('1', function () {
       assert.equal('ein', read.number(1)); 
    });
    
    it('2', function () {
       assert.equal('zwei', read.number(2)); 
    });
    
    it('3', function () {
       assert.equal('drei', read.number(3)); 
    });
    
    it('4', function () {
       assert.equal('vier', read.number(4)); 
    });
    
    it('5', function () {
       assert.equal('fünf', read.number(5)); 
    });
    
    it('6', function () {
       assert.equal('sechs', read.number(6)); 
    });
    
    it('7', function () {
       assert.equal('sieben', read.number(7)); 
    });
    
    it('8', function () {
       assert.equal('acht', read.number(8)); 
    });
    
    it('9', function () {
       assert.equal('neun', read.number(9)); 
    });
});

describe('Read year', function () {
    
});

describe('Read time', function () {
    
});

