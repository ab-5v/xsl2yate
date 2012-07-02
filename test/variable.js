var should = require('should');
var compare = require('./util/compare');

describe('xsl:variable', function() {

    it('xsl:variable', function(done) {
        compare('variable', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('xsl:variable oneline', function(done) {
        compare('variable-oneline', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

