var should = require('should');
var compare = require('./util/compare');

describe('template', function() {

    it('xsl:template@match', function(done) {
        compare('template-match', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});
