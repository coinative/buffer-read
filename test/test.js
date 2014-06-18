var Reader = require('../');

function readerFromHex(hex) {
  return new Reader(new Buffer(hex, 'hex'));
}

describe('ghostreader', function () {
  it('readUInt8()', function () {
    var reader = readerFromHex('00' + '18' + '8d' + 'ff');

    expect(reader.readUInt8()).to.equal(0x00);
    expect(reader.readUInt8()).to.equal(0x18);
    expect(reader.readUInt8()).to.equal(0x8d);
    expect(reader.readUInt8()).to.equal(0xff);
    expect(reader.offset).to.equal(4);
  });

  it('readUInt16BE()', function () {
    var reader = readerFromHex('0000' + '0001' + '0100' + 'ffff');

    expect(reader.readUInt16BE()).to.equal(0x0000);
    expect(reader.readUInt16BE()).to.equal(0x0001);
    expect(reader.readUInt16BE()).to.equal(0x0100);
    expect(reader.readUInt16BE()).to.equal(0xffff);
    expect(reader.offset).to.equal(8);
  });

  it('readUInt16LE()', function () {
    var reader = readerFromHex('0000' + '0100' + '0001' + 'ffff');

    expect(reader.readUInt16LE()).to.equal(0x0000);
    expect(reader.readUInt16LE()).to.equal(0x0001);
    expect(reader.readUInt16LE()).to.equal(0x0100);
    expect(reader.readUInt16LE()).to.equal(0xffff);
    expect(reader.offset).to.equal(8);
  });

  it('readUInt32BE()', function () {
    var reader = readerFromHex('00000000' + '00000001' + '00010000' + 'ffffffff');

    expect(reader.readUInt32BE()).to.equal(0x00000000);
    expect(reader.readUInt32BE()).to.equal(0x00000001);
    expect(reader.readUInt32BE()).to.equal(0x00010000);
    expect(reader.readUInt32BE()).to.equal(0xffffffff);
    expect(reader.offset).to.equal(16);
  });

  it('readUInt32LE()', function () {
    var reader = readerFromHex('00000000' + '01000000' + '00000100' + 'ffffffff');

    expect(reader.readUInt32LE()).to.equal(0x00000000);
    expect(reader.readUInt32LE()).to.equal(0x00000001);
    expect(reader.readUInt32LE()).to.equal(0x00010000);
    expect(reader.readUInt32LE()).to.equal(0xffffffff);
    expect(reader.offset).to.equal(16);
  });

  it('readUInt64BE()', function () {
    var reader = readerFromHex('0000000000000000' + '0000000000000001' + '0000000100000000' + '001fffffffffffff');

    expect(reader.readUInt64BE()).to.equal(0x0000000000000000);
    expect(reader.readUInt64BE()).to.equal(0x0000000000000001);
    expect(reader.readUInt64BE()).to.equal(0x0000000100000000);
    expect(reader.readUInt64BE()).to.equal(0x001fffffffffffff);
    expect(reader.offset).to.equal(32);

    expect(function () {
      readerFromHex('0020000000000000').readUInt64BE();
    }).to.throw(RangeError);
  });

  it('readUInt64LE()', function () {
    var reader = readerFromHex('0000000000000000' + '0100000000000000' + '0000000001000000' + 'ffffffffffff1f00');

    expect(reader.readUInt64LE()).to.equal(0x0000000000000000);
    expect(reader.readUInt64LE()).to.equal(0x0000000000000001);
    expect(reader.readUInt64LE()).to.equal(0x0000000100000000);
    expect(reader.readUInt64LE()).to.equal(0x001fffffffffffff);
    expect(reader.offset).to.equal(32);

    expect(function () {
      readerFromHex('0000000000002000').readUInt64LE();
    }).to.throw(RangeError);
  });

  it('readInt8()', function () {
    var reader = readerFromHex('80' + 'ff' + '00' + '18' + '7f');

    expect(reader.readInt8()).to.equal(-0x80);
    expect(reader.readInt8()).to.equal(-0x01);
    expect(reader.readInt8()).to.equal(0x00);
    expect(reader.readInt8()).to.equal(0x18);
    expect(reader.readInt8()).to.equal(0x7f);
    expect(reader.offset).to.equal(5);
  });

  it('readInt16BE()', function () {
    var reader = readerFromHex('8000' + 'ffff' + '0000' + '0100' + '7fff');

    expect(reader.readInt16BE()).to.equal(-0x8000);
    expect(reader.readInt16BE()).to.equal(-0x0001);
    expect(reader.readInt16BE()).to.equal(0x0000);
    expect(reader.readInt16BE()).to.equal(0x0100);
    expect(reader.readInt16BE()).to.equal(0x7fff);
    expect(reader.offset).to.equal(10);
  });

  it('readInt16LE()', function () {
    var reader = readerFromHex('0080' + 'ffff' + '0000' + '0001' + 'ff7f');

    expect(reader.readInt16LE()).to.equal(-0x8000);
    expect(reader.readInt16LE()).to.equal(-0x0001);
    expect(reader.readInt16LE()).to.equal(0x0000);
    expect(reader.readInt16LE()).to.equal(0x0100);
    expect(reader.readInt16LE()).to.equal(0x7fff);
    expect(reader.offset).to.equal(10);
  });

  it('readInt32BE()', function () {
    var reader = readerFromHex('80000000' + 'ffffffff' + '00000000' + '00010000' + '7fffffff');

    expect(reader.readInt32BE()).to.equal(-0x80000000);
    expect(reader.readInt32BE()).to.equal(-0x00000001);
    expect(reader.readInt32BE()).to.equal(0x00000000);
    expect(reader.readInt32BE()).to.equal(0x00010000);
    expect(reader.readInt32BE()).to.equal(0x7fffffff);
    expect(reader.offset).to.equal(20);
  });


  it('readInt32LE()', function () {
    var reader = readerFromHex('00000080' + 'ffffffff' + '00000000' + '00000100' + 'ffffff7f');

    expect(reader.readInt32LE()).to.equal(-0x80000000);
    expect(reader.readInt32LE()).to.equal(-0x00000001);
    expect(reader.readInt32LE()).to.equal(0x00000000);
    expect(reader.readInt32LE()).to.equal(0x00010000);
    expect(reader.readInt32LE()).to.equal(0x7fffffff);
    expect(reader.offset).to.equal(20);
  });

  it('readInt64BE()', function () {
    var reader = readerFromHex('ffe0000000000001' + 'ffffffffffffffff' + '0000000000000000' + '0000000100000000' + '001fffffffffffff');

    expect(reader.readInt64BE()).to.equal(-0x001fffffffffffff);
    expect(reader.readInt64BE()).to.equal(-0x0000000000000001);
    expect(reader.readInt64BE()).to.equal(0x0000000000000000);
    expect(reader.readInt64BE()).to.equal(0x0000000100000000);
    expect(reader.readInt64BE()).to.equal(0x001fffffffffffff);
    expect(reader.offset).to.equal(40);

    expect(function () {
      readerFromHex('8020000000000000').readInt64BE();
    }).to.throw(RangeError);
    expect(function () {
      readerFromHex('0020000000000000').readInt64BE();
    }).to.throw(RangeError);
  });


  it('readInt64LE()', function () {
    var reader = readerFromHex('010000000000e0ff' + 'ffffffffffffffff' + '0000000000000000' + '0000000001000000' + 'ffffffffffff1f00');

    expect(reader.readInt64LE()).to.equal(-0x001fffffffffffff);
    expect(reader.readInt64LE()).to.equal(-0x0000000000000001);
    expect(reader.readInt64LE()).to.equal(0x0000000000000000);
    expect(reader.readInt64LE()).to.equal(0x0000000100000000);
    expect(reader.readInt64LE()).to.equal(0x001fffffffffffff);
    expect(reader.offset).to.equal(40);

    expect(function () {
      readerFromHex('0000000000002080').readInt64LE();
    }).to.throw(RangeError);
    expect(function () {
      readerFromHex('0000000000002000').readInt64LE();
    }).to.throw(RangeError);;
  });


  it('readFloatBE()', function () {
    var reader = readerFromHex('00000000' + '3dcccccd' + '419ccccd');

    expect(reader.readFloatBE()).to.equal(0);
    expect(reader.readFloatBE().toPrecision(1)).to.equal('0.1');
    expect(reader.readFloatBE().toPrecision(3)).to.equal('19.6');
    expect(reader.offset).to.equal(12);
  });

  it('readFloatLE()', function () {
    var reader = readerFromHex('00000000' + 'cdcccc3d' + 'cdcc9c41');

    expect(reader.readFloatLE()).to.equal(0);
    expect(reader.readFloatLE().toPrecision(1)).to.equal('0.1');
    expect(reader.readFloatLE().toPrecision(3)).to.equal('19.6');
    expect(reader.offset).to.equal(12);
  });

  it('readDoubleBE()', function () {
    var reader = readerFromHex('0000000000000000' + '3fb999999999999a' + '403399999999999a' + '4a5337ae84cd3731');

    expect(reader.readDoubleBE()).to.equal(0);
    expect(reader.readDoubleBE()).to.equal(0.1);
    expect(reader.readDoubleBE()).to.equal(19.6);
    expect(reader.readDoubleBE()).to.equal(1.1234567e50);
    expect(reader.offset).to.equal(32);
  });

  it('readDoubleLE()', function () {
    var reader = readerFromHex('0000000000000000' + '9a9999999999b93f' + '9a99999999993340' + '3137cd84ae37534a');

    expect(reader.readDoubleLE()).to.equal(0);
    expect(reader.readDoubleLE()).to.equal(0.1);
    expect(reader.readDoubleLE()).to.equal(19.6);
    expect(reader.readDoubleLE()).to.equal(1.1234567e50);
    expect(reader.offset).to.equal(32);
  });

  it('toString([length], [encoding])', function () {
    var reader = readerFromHex('6162' + '63646566' + '3132' + '1234abef');

    expect(reader.toString(2)).to.equal('ab');
    expect(reader.toString(4)).to.equal('cdef');
    expect(reader.toString(2, 'hex')).to.equal('3132');
    expect(reader.toString('hex')).to.equal('1234abef');
    expect(reader.offset).to.equal(12);
  });

  it('slice([length])', function () {
    var reader = readerFromHex('abcdef123456');

    expect(reader.slice(2).toString('hex')).to.equal('abcd');
    expect(reader.slice(1).toString('hex')).to.equal('ef');
    expect(reader.slice().toString('hex')).to.equal('123456');
    expect(reader.offset).to.equal(6);
  });

  it('copy(targetBuffer, [targetStart], [length]', function () {
    var reader = readerFromHex('070707' + '01020304' + '68676665');

    var buf = new Buffer(9);
    buf.fill(0);
    reader.copy(buf, 0, 4);
    expect(buf.toString('hex')).to.equal('070707010000000000');
    reader.offset = 0;
    buf.fill(0);
    reader.copy(buf);
    expect(buf.toString('hex')).to.equal('070707010203046867');
    reader.offset = 0;
    buf.fill(0);
    reader.copy(buf, 2);
    expect(buf.toString('hex')).to.equal('000007070701020304');
    reader.offset = 0;
    buf.fill(0);
    reader.copy(buf, 2, 5);
    expect(buf.toString('hex')).to.equal('000007070701020000');
  });

  it('should allow non-new contruction', function () {
    var reader = Reader(new Buffer('hello'));
    expect(reader.toString()).to.equal('hello');
  });
});
