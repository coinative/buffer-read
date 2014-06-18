function Reader(buffer) {
  if (!(this instanceof Reader)) {
    return new Reader(buffer);
  }
  this._buffer = buffer;
  this.offset = 0;
}

function readMethod(method, size) {
  Reader.prototype[method] = function () {
    var val = this._buffer[method](this.offset);
    this.offset += size;
    return val;
  };
}

readMethod('readUInt8', 1);
readMethod('readUInt16BE', 2);
readMethod('readUInt16LE', 2);
readMethod('readUInt32BE', 4);
readMethod('readUInt32LE', 4);

Reader.prototype.readUInt64BE = function () {
  var hi = this.readUInt32BE();
  var lo = this.readUInt32BE();
  if (hi > 0x1fffff) {
    throw new RangeError('value was out of bounds');
  }
  return (hi * Math.pow(2, 32)) + lo;
};

Reader.prototype.readUInt64LE = function () {
  var lo = this.readUInt32LE();
  var hi = this.readUInt32LE();
  if (hi > 0x1fffff) {
    throw new RangeError('value was out of bounds');
  }
  return (hi * Math.pow(2, 32)) + lo;
};

readMethod('readInt8', 1);
readMethod('readInt16BE', 2);
readMethod('readInt16LE', 2);
readMethod('readInt32BE', 4);
readMethod('readInt32LE', 4);

Reader.prototype.readInt64BE = function () {
  var hi = this.readInt32BE();
  var lo = this.readUInt32BE();
  if (hi < -0x200000 || hi > 0x1fffff) {
    throw new RangeError('value was out of bounds');
  }
  return (hi * Math.pow(2, 32)) + lo;
};

Reader.prototype.readInt64LE = function () {
  var lo = this.readUInt32LE();
  var hi = this.readInt32LE();
  if (hi < -0x200000 || hi > 0x1fffff) {
    throw new RangeError('value was out of bounds');
  }
  return (hi * Math.pow(2, 32)) + lo;
};

readMethod('readFloatBE', 4);
readMethod('readFloatLE', 4);
readMethod('readDoubleBE', 8);
readMethod('readDoubleLE', 8);

Reader.prototype.toString = function (length, encoding) {
  if (typeof length === 'undefined' || typeof length === 'string') {
    if (typeof length === 'string') {
      encoding = length;
    }
    length = this._buffer.length - this.offset;
  }

  var string = this._buffer.toString(encoding, this.offset, this.offset + length);
  this.offset += length;
  return string;
};

Reader.prototype.slice = function (length) {
  if (typeof length === 'undefined') {
    length = this._buffer.length - this.offset;
  }
  var buffer = this._buffer.slice(this.offset, this.offset + length);
  this.offset += length;
  return buffer;
};

Reader.prototype.copy = function (targetBuffer, targetStart, length) {
  if (typeof length === 'undefined') {
    length = Math.min(targetBuffer.length, this._buffer.length - this.offset);
  }
  if (typeof targetStart === 'undefined') {
    targetStart = 0;
  }

  this._buffer.copy(targetBuffer, targetStart, this.offset, this.offset + length);
  this.offset += length;
};

module.exports = Reader;
