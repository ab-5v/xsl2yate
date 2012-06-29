var should = require('should');
var compare = require('./util/compare');

describe('cleanup', function() {

    it('xml', function(done) {
        compare('cleanup-xml', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('doctype', function(done) {
        compare('cleanup-doctype', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('stylesheet', function(done) {
        compare('cleanup-stylesheet', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('complex', function(done) {
        compare('cleanup', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

