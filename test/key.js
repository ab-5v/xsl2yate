var should = require('should');
var compare = require('./util/compare');

describe('xsl:key', function() {

    it('xsl:key', function(done) {
        compare('key', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

