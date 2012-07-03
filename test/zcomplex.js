var should = require('should');
var compare = require('./util/compare');

describe('complex', function() {

    it('complex', function(done) {
        compare('complex', function(err, src, res) {
            // переносы строк задалбывают
            //src = src.replace(/\n/g, '*');
            //res = res.replace(/\n/g, '*');
            //src = src.replace(/\s/g, '_');
            //res = res.replace(/\s/g, '_');

            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('complex jpath', function(done) {
        compare('complex-jpath', function(err, src, res) {
            // переносы строк задалбывают
            //src = src.replace(/\n/g, '*');
            //res = res.replace(/\n/g, '*');
            //src = src.replace(/\s/g, '_');
            //res = res.replace(/\s/g, '_');

            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

