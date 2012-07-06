var should = require('should');
var jpath = require('../').jpath;


describe('jpath operators', function() {
    it('not($a) -> !(a)', function() {
        jpath('not($a)').should.equal('!(a)');
    });
    it('key(\'labels\', \'active\') -> labels(\'active\')', function() {
        jpath('key(\'labels\', \'active\')').should.equal('labels(\'active\')');
    });
    it('not($a) -> !(a)', function() {
        jpath('not($a)').should.equal('!(a)');
    });

    it('key(\'folders\', folder/id)/symbol', function() {
        jpath('key(\'folders\', folder/id)/symbol').should.equal('folders(.folder.id).symbol');
    });
});

