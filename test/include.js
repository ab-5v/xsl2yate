var should = require('should');
var compare = require('./util/compare');

describe('include', function() {

    it('xsl:include', function(done) {
        compare('include', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('xsl:include close', function(done) {
        compare('include-close', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

