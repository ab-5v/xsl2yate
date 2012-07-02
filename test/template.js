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

    it('xsl:template@match oneline', function(done) {
        compare('template-match-oneline', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('xsl:template@match@mode', function(done) {
        compare('template-match-mode', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('xsl:template@match@mode oneline', function(done) {
        compare('template-match-mode-oneline', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('xsl:template@name', function(done) {
        compare('template-name', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('xsl:template@name oneline', function(done) {
        compare('template-name-oneline', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});
