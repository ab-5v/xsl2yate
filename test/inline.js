var should = require('should');
var compare = require('./util/compare');

describe('<span name="{some}" ...', function() {

    it('inline', function(done) {
        compare('inline', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

