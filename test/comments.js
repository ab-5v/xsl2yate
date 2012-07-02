var should = require('should');
var compare = require('./util/compare');

describe('text', function() {

    it('<!-- -->', function(done) {
        compare('comments', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('<!-- \\n -->', function(done) {
        compare('comments-multiline', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

