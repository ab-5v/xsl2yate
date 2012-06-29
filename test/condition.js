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

    it('when@test', function(done) {
        compare('cond-when', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('2when@test', function(done) {
        compare('cond-2when', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('2when@test otherwise', function(done) {
        compare('cond-2wheno', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });

    it('4when@test 2when@test otherwise', function(done) {
        compare('cond-2when-2wheno', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

