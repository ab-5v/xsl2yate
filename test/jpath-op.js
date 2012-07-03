var should = require('should');
var jpath = require('../').jpath;


describe('jpath operators', function() {
    it('$a | $b -> a | b', function() {
        jpath('$a | $b').should.equal('a | b');
    });
    it('$a + $b -> a + b', function() {
        jpath('$a + $b').should.equal('a + b');
    });
    it('$a div $b', function() {
        jpath('$a div $b').should.equal('a / b');
    });
    it('$a mod $b -> a % b', function() {
        jpath('$a mod $b').should.equal('a % b');
    });
    it('$a or $b -> a || b', function() {
        jpath('$a or $b').should.equal('a || b');
    });
    it('$a and $b -> a && b', function() {
        jpath('$a and $b').should.equal('a && b');
    });
    it('$a &gt; $b -> a > b', function() {
        jpath('$a &gt; $b').should.equal('a > b');
    });
    it('$a &gt;= $b', function() {
        jpath('$a &gt;= $b').should.equal('a >= b');
    });
    it('$a &lt; $b -> a < b', function() {
        jpath('$a &lt; $b').should.equal('a < b');
    });
    it('$a &lt;= $b -> a <= b', function() {
        jpath('$a &lt;= $b').should.equal('a <= b');
    });
    it('$a = $b -> a == b', function() {
        jpath('$a = $b').should.equal('a == b');
    });
    it('$a != $b -> a != b', function() {
        jpath('$a != $b').should.equal('a != b');
    });
});
