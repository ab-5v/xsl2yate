var should = require('should');
var compare = require('./util/compare');

describe('apply-templates', function() {

    it('apply-templates@select@mode', function(done) {
        compare('apply-templates', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

