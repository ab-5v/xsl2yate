var should = require('should');
var compare = require('./util/compare');

describe('condition', function() {

    it('if@test', function(done) {
        compare('cond-if', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

