var assert = require('assert');
var read = require('./lib/de-read.js');
var numberLength = read.util.numberLength;

describe('Number length', function () {
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

describe('Read time', function () {
    
});

describe('Read year', function () {
    
});

describe('Read number', function () {

});