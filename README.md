# de-read ![Build Status](https://travis-ci.org/Frederick-S/de-read.svg) [![Coverage Status](https://coveralls.io/repos/github/Frederick-S/de-read/badge.svg?branch=master)](https://coveralls.io/github/Frederick-S/de-read?branch=master)
Read number/year/time in German.

## Usage
### Number
```js
var read = require('de-read');
var number = read.number;

console.log(number.read(123456789)); // => hundertdreiundzwanzig Millionen vierhundertsechsundfünfzigtausendsiebenhundertneunundachtzig
```

### Year
```js
var read = require('de-read');
var year = read.year;

console.log(year.read(2008)); // => zweitausendacht 
console.log(year.read(1949)); // => neunzehnhundertneunundvierzig
```

### Time
Read time officially:
```js
var read = require('de-read');
var time = read.time;

console.log(time.read(6, 0, true)); // => um sechs Uhr
console.log(time.read(8, 45, true)); // => um acht Uhr fünfundvierzig
```

Or read time unofficially:
```js
var read = require('de-read');
var time = read.time;

console.log(time.read(10, 40)); // => zwanzig vor elf
console.log(time.read(10, 45)); // => Viertel vor elf
```

## License
MIT.
