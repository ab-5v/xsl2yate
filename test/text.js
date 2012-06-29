var should = require('should');
var compare = require('./util/compare');

describe('text', function() {

    it('xsl:text', function(done) {
        compare('text', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});
