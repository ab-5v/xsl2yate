var should = require('should');
var compare = require('./util/compare');

describe('complex', function() {

    it('complex', function(done) {
        compare('complex', function(err, src, res) {
            // переносы строк задалбывают
            //src = src.replace(/\n/g, '*');
            //res = res.replace(/\n/g, '*');

            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

