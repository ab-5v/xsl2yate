var should = require('should');
var jpath = require('../').jpath;


describe('jpath', function() {

    it('/ -> /', function() {
        jpath('/').should.equal('/');
    });
    it('/*/foo -> /.*.foo', function() {
        jpath('/*/foo').should.equal('/.*.foo');
    });
    it('/bar -> /.bar', function() {
        jpath('/bar').should.equal('/.bar');
    });
    it('foo -> .foo', function() {
        jpath('foo').should.equal('.foo');
    });
    it('foo/bar -> .foo.bar', function() {
        jpath('foo/bar').should.equal('.foo.bar');
    });
    it('. -> .', function() {
        jpath('.').should.equal('.');
    });
    it('.. -> ..', function() {
        jpath('..').should.equal('..');
    });
    it('../.. -> ...', function() {
        jpath('../..').should.equal('...');
    });
    it('../foo -> ..foo', function() {
        jpath('../foo').should.equal('..foo');
    });
    it('../foo/../bar -> ..foo..bar', function() {
        jpath('../foo/../bar').should.equal('..foo..bar');
    });
    it('foo/* -> .foo.*', function() {
        jpath('foo/*').should.equal('.foo.*');
    });
    it('../* -> ..*', function() {
        jpath('../*').should.equal('..*');
    });
    it('*/* -> .*.*', function() {
        jpath('*/*').should.equal('.*.*');
    });
});
