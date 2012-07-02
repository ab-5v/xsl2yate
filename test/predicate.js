var should = require('should');
var compare = require('./util/compare');

describe('predicate', function() {

    it('predicate', function(done) {
        compare('predicate', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

