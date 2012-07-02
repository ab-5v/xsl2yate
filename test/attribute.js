var should = require('should');
var compare = require('./util/compare');

describe('text', function() {

    it('xsl:attribute', function(done) {
        compare('attribute', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

