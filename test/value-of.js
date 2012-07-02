var should = require('should');
var compare = require('./util/compare');

describe('xsl:value-of', function() {

    it('xsl:value-of', function(done) {
        compare('value-of', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

