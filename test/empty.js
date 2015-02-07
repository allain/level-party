var test = require('tape');
var level = require('../');
var path = require('path');
var os = require('os');
var tmpdir = require('osenv').tmpdir();
var datadir = path.join(tmpdir, 'level-party-' + Math.random());

test('empty', function (t) {
    t.plan(3);
    var db = level(datadir);

    db.get('a', function(err, a) {
     t.ok(err && err.notFound, 'expect err.notFound');
     t.equal(a, void 0, 'returned doc should be undefined'); 
    });
    
    db.createReadStream()
    .on('data', function(row) {
      t.fail('no data should be emitted for empty level'); 
    })
    .on('end', function() {
      t.ok(true, 'should emit this, even on an empty stream');
    });

    t.on('end', function () {
        db.close();
    });
});
