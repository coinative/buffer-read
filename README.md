# ghostreader

[![Build Status](https://img.shields.io/travis/coinative/ghostreader.svg)](https://travis-ci.org/coinative/ghostreader) [![Coverage Status](https://img.shields.io/coveralls/coinative/ghostreader.svg)](https://coveralls.io/r/coinative/ghostreader?branch=master)

Read values from a buffer without maintaining an offset. Useful when you don't want to maintain an offset yourself.

* This module tries to mirror Buffer methods for simplicity.
* Supports reading 64-bit values at 52-bit precision (JavaScript safe integer maximum).

## Install

```
npm install ghostreader
```

## Usage

```js
var Reader = require('ghostreader');

var reader = new Reader(new Buffer('6101010172010203', 'hex'));
reader.toString(1); // 'a'
reader.offset += 3; // Skip over 3 bytes
reader.readInt8()   // 0x72
reader.slice(3)     // <Buffer 01 02 03>

```

## API

### read[U]Int8(), read[U]{16,32,64}{BE,LE}()

Read an integer of the specified size and endian format.

### readFloat{BE,LE}(), readDouble{BE,LE}()

Read a floating point number of the specified size and endian format.

### toString([encoding], [length])

Read a string of specified length and encoding.

### slice([length])

Create a slice of the buffer.

### offset

The current byte offset.

### copy(targetBuffer, [length], [targetStart])

Copy data into another buffer.

## License

MIT
