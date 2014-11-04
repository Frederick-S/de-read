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
       assert.equal('eins', read.number(1)); 
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
    
    it('10', function () {
       assert.equal('zehn', read.number(10)); 
    });
    
    it('11', function () {
       assert.equal('elf', read.number(11)); 
    });
    
    it('12', function () {
       assert.equal('zwölf', read.number(12)); 
    });
    
    it('13', function () {
       assert.equal('dreizehn', read.number(13)); 
    });
    
    it('14', function () {
       assert.equal('vierzehn', read.number(14)); 
    });
    
    it('15', function () {
       assert.equal('fünfzehn', read.number(15)); 
    });
    
    it('16', function () {
       assert.equal('sechzehn', read.number(16)); 
    });
    
    it('17', function () {
       assert.equal('siebzehn', read.number(17)); 
    });
    
    it('18', function () {
       assert.equal('achtzehn', read.number(18)); 
    });
    
    it('19', function () {
       assert.equal('neunzehn', read.number(19)); 
    });
    
    it('20', function () {
       assert.equal('zwanzig', read.number(20)); 
    });
    
    it('21', function () {
       assert.equal('einundzwanzig', read.number(21)); 
    });
    
    it('22', function () {
       assert.equal('zweiundzwanzig', read.number(22)); 
    });
    
    it('23', function () {
       assert.equal('dreiundzwanzig', read.number(23)); 
    });
    
    it('24', function () {
       assert.equal('vierundzwanzig', read.number(24)); 
    });
    
    it('25', function () {
       assert.equal('fünfundzwanzig', read.number(25)); 
    });
    
    it('26', function () {
       assert.equal('sechsundzwanzig', read.number(26)); 
    });
    
    it('27', function () {
       assert.equal('siebenundzwanzig', read.number(27)); 
    });
    
    it('28', function () {
       assert.equal('achtundzwanzig', read.number(28)); 
    });
    
    it('29', function () {
       assert.equal('neunundzwanzig', read.number(29)); 
    });
    
    it('30', function () {
       assert.equal('dreißig', read.number(30)); 
    });
    
    it('40', function () {
       assert.equal('vierzig', read.number(40)); 
    });
    
    it('50', function () {
       assert.equal('fünfzig', read.number(50)); 
    });
    
    it('60', function () {
       assert.equal('sechzig', read.number(60)); 
    });
    
    it('70', function () {
       assert.equal('siebzig', read.number(70)); 
    });
    
    it('80', function () {
       assert.equal('achtzig', read.number(80)); 
    });
    
    it('90', function () {
       assert.equal('neunzig', read.number(90)); 
    });
});

describe('Read year', function () {
    
});

describe('Read time', function () {
    
});

