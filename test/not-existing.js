var should = require('should');
var compare = require('./util/compare');

describe('not-existing', function() {

    it('not existing', function(done) {
        compare('not-existing', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});
