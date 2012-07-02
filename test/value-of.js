var should = require('should');
var compare = require('./util/compare');

describe('text', function() {

    it('xsl:value-of', function(done) {
        compare('value-of', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

