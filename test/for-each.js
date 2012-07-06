var should = require('should');
var compare = require('./util/compare');

describe('for-each', function() {

    it('simple', function(done) {
        compare('for-each', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

