# de-read [![Build Status](https://travis-ci.org/Frederick-S/de-read.svg)](https://travis-ci.org/Frederick-S/de-read) [![Coverage Status](https://img.shields.io/coveralls/Frederick-S/de-read.svg)](https://coveralls.io/r/Frederick-S/de-read)
Read number/year/time in German.

## Usage
### Number
```js
var read = require('de-read');
var number = read.number;

console.log(number.read(123456789));

// Output: hundertdreiundzwanzig Millionen vierhundertsechsundfünfzigtausendsiebenhundertneunundachtzig
```
