var assert = require('assert');
var read = require('./lib/de-read.js');
var number = read.number;

describe('Read number', function () {
    it('0', function () {
       assert.equal('null', number.read(0)); 
    });
    
    it('1', function () {
       assert.equal('eins', number.read(1)); 
    });
    
    it('2', function () {
       assert.equal('zwei', number.read(2)); 
    });
    
    it('3', function () {
       assert.equal('drei', number.read(3)); 
    });
    
    it('4', function () {
       assert.equal('vier', number.read(4)); 
    });
    
    it('5', function () {
       assert.equal('fünf', number.read(5)); 
    });
    
    it('6', function () {
       assert.equal('sechs', number.read(6)); 
    });
    
    it('7', function () {
       assert.equal('sieben', number.read(7)); 
    });
    
    it('8', function () {
       assert.equal('acht', number.read(8)); 
    });
    
    it('9', function () {
       assert.equal('neun', number.read(9)); 
    });
    
    it('10', function () {
       assert.equal('zehn', number.read(10)); 
    });
    
    it('11', function () {
       assert.equal('elf', number.read(11)); 
    });
    
    it('12', function () {
       assert.equal('zwölf', number.read(12)); 
    });
    
    it('13', function () {
       assert.equal('dreizehn', number.read(13)); 
    });
    
    it('14', function () {
       assert.equal('vierzehn', number.read(14)); 
    });
    
    it('15', function () {
       assert.equal('fünfzehn', number.read(15)); 
    });
    
    it('16', function () {
       assert.equal('sechzehn', number.read(16)); 
    });
    
    it('17', function () {
       assert.equal('siebzehn', number.read(17)); 
    });
    
    it('18', function () {
       assert.equal('achtzehn', number.read(18)); 
    });
    
    it('19', function () {
       assert.equal('neunzehn', number.read(19)); 
    });
    
    it('20', function () {
       assert.equal('zwanzig', number.read(20)); 
    });
    
    it('21', function () {
       assert.equal('einundzwanzig', number.read(21)); 
    });
    
    it('22', function () {
       assert.equal('zweiundzwanzig', number.read(22)); 
    });
    
    it('23', function () {
       assert.equal('dreiundzwanzig', number.read(23)); 
    });
    
    it('24', function () {
       assert.equal('vierundzwanzig', number.read(24)); 
    });
    
    it('25', function () {
       assert.equal('fünfundzwanzig', number.read(25)); 
    });
    
    it('26', function () {
       assert.equal('sechsundzwanzig', number.read(26)); 
    });
    
    it('27', function () {
       assert.equal('siebenundzwanzig', number.read(27)); 
    });
    
    it('28', function () {
       assert.equal('achtundzwanzig', number.read(28)); 
    });
    
    it('29', function () {
       assert.equal('neunundzwanzig', number.read(29)); 
    });
    
    it('30', function () {
       assert.equal('dreißig', number.read(30)); 
    });
    
    it('40', function () {
       assert.equal('vierzig', number.read(40)); 
    });
    
    it('50', function () {
       assert.equal('fünfzig', number.read(50)); 
    });
    
    it('60', function () {
       assert.equal('sechzig', number.read(60)); 
    });
    
    it('70', function () {
       assert.equal('siebzig', number.read(70)); 
    });
    
    it('80', function () {
       assert.equal('achtzig', number.read(80)); 
    });
    
    it('90', function () {
       assert.equal('neunzig', number.read(90)); 
    });
    
    it('100', function () {
       assert.equal('hundert', number.read(100)); 
    });
    
    it('107', function () {
       assert.equal('hundertsieben', number.read(107)); 
    });
    
    it('139', function () {
       assert.equal('hundertneununddreißig', number.read(139)); 
    });
    
    it('213', function () {
       assert.equal('zweihundertdreizehn', number.read(213)); 
    });
    
    it('320', function () {
       assert.equal('dreihundertzwanzig', number.read(320)); 
    });
    
    it('460', function () {
       assert.equal('vierhundertsechzig', number.read(460)); 
    });
    
    it('921', function () {
       assert.equal('neunhunderteinundzwanzig', number.read(921)); 
    });
    
    it('1000', function () {
       assert.equal('tausend', number.read(1000)); 
    });
    
    it('1001', function () {
       assert.equal('tausendeins', number.read(1001)); 
    });
    
    it('1007', function () {
       assert.equal('tausendsieben', number.read(1007)); 
    });
    
    it('1023', function () {
       assert.equal('tausenddreiundzwanzig', number.read(1023)); 
    });
    
    it('2000', function () {
       assert.equal('zweitausend', number.read(2000)); 
    });
    
    it('2001', function () {
       assert.equal('zweitausendeins', number.read(2001)); 
    });
    
    it('2083', function () {
       assert.equal('zweitausenddreiundachtzig', number.read(2083)); 
    });
    
    it('3504', function () {
       assert.equal('dreitausendfünfhundertvier', number.read(3504)); 
    });
    
    it('6789', function () {
       assert.equal('sechstausendsiebenhundertneunundachtzig', number.read(6789)); 
    });
    
    it('7100', function () {
       assert.equal('siebentausendhundert', number.read(7100)); 
    });
    
    it('7101', function () {
       assert.equal('siebentausendhunderteins', number.read(7101)); 
    });
    
    it('10000', function () {
       assert.equal('zehntausend', number.read(10000)); 
    });
    
    it('10001', function () {
       assert.equal('zehntausendeins', number.read(10001)); 
    });
    
    it('65726', function () {
       assert.equal('fünfundsechzigtausendsiebenhundertsechsundzwanzig', number.read(65726)); 
    });
    
    it('100000', function () {
       assert.equal('hunderttausend', number.read(100000)); 
    });
    
    it('101000', function () {
       assert.equal('hunderteintausend', number.read(101000)); 
    });
    
    it('123456', function () {
       assert.equal('hundertdreiundzwanzigtausendvierhundertsechsundfünfzig', number.read(123456)); 
    });
    
    it('801497', function () {
       assert.equal('achthunderteintausendvierhundertsiebenundneunzig', number.read(801497)); 
    });
    
    it('1000000', function () {
       assert.equal('eine Million', number.read(1000000)); 
    });
    
    it('1001001', function () {
       assert.equal('eine Million tausendeins', number.read(1001001)); 
    });
    
    
    it('1234567', function () {
       assert.equal('eine Million zweihundertvierunddreißigtausendfünfhundertsiebenundsechzig', number.read(1234567)); 
    });
    
    it('2000000', function () {
       assert.equal('zwei Millionen', number.read(2000000)); 
    });
    
    it('3000001', function () {
       assert.equal('drei Millionen eins', number.read(3000001)); 
    });
    
    it('4001000', function () {
       assert.equal('vier Millionen tausend', number.read(4001000)); 
    });
    
    it('10000001', function () {
       assert.equal('zehn Millionen eins', number.read(10000001)); 
    });
    
    it('10001000', function () {
       assert.equal('zehn Millionen tausend', number.read(10001000)); 
    });
    
    it('11000000', function () {
       assert.equal('elf Millionen', number.read(11000000)); 
    });
    
    it('12345678', function () {
       assert.equal('zwölf Millionen dreihundertfünfundvierzigtausendsechshundertachtundsiebzig', number.read(12345678)); 
    });
    
    it('100000000', function () {
       assert.equal('hundert Millionen', number.read(100000000)); 
    });
    
    it('100000001', function () {
       assert.equal('hundert Millionen eins', number.read(100000001)); 
    });
    
    it('100001000', function () {
       assert.equal('hundert Millionen tausend', number.read(100001000)); 
    });
    
    it('100100000', function () {
       assert.equal('hundert Millionen hunderttausend', number.read(100100000)); 
    });
    
    it('123456789', function () {
       assert.equal('hundertdreiundzwanzig Millionen vierhundertsechsundfünfzigtausendsiebenhundertneunundachtzig', number.read(123456789)); 
    });
    
    it('1000000000', function () {
       assert.equal('eine Milliarde', number.read(1000000000)); 
    });
    
    it('1000000001', function () {
       assert.equal('eine Milliarde eins', number.read(1000000001)); 
    });
    
    it('1000001000', function () {
       assert.equal('eine Milliarde tausend', number.read(1000001000)); 
    });
    
    it('2123456789', function () {
       assert.equal('zwei Milliarden hundertdreiundzwanzig Millionen vierhundertsechsundfünfzigtausendsiebenhundertneunundachtzig', number.read(2123456789)); 
    });
    
    it('10123456789', function () {
       assert.equal('zehn Milliarden hundertdreiundzwanzig Millionen vierhundertsechsundfünfzigtausendsiebenhundertneunundachtzig', number.read(10123456789)); 
    });
    
    it('100123456789', function () {
       assert.equal('hundert Milliarden hundertdreiundzwanzig Millionen vierhundertsechsundfünfzigtausendsiebenhundertneunundachtzig', number.read(100123456789)); 
    });
});