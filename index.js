// Zlib - Node wrapper around the zlib compression library
var zlib       = require('zlib');
var gzip       = zlib.createGzip();
var gunzip     = zlib.createGunzip();

var fs         = require('fs');
var inStream1  = fs.createReadStream('input.txt');
var outStream1 = fs.createWriteStream('tmp/output.txt.gz');

// Compress input.txt using gzip
inStream1
  .pipe(gzip)
  .pipe(outStream1);

// Uncompress ouput.txt.gz using gunzip
outStream1.on('finish', function() {
  var inStream2  = fs.createReadStream('tmp/output.txt.gz');
  var outStream2 = fs.createWriteStream('tmp/output.txt');

  inStream2
    .pipe(gunzip)
    .pipe(outStream2);
});