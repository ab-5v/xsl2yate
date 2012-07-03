var should = require('should');
var jpath = require('../').jpath;


describe('jpath predicate', function() {
    it('item[count &gt;= new] -> .item[.count >= .new]', function() {
        jpath('item[count &gt;= new]').should.equal('.item[.count >= .new]');
    });
    it('items/item[ @index ] -> .items.item[ .index ]', function() {
        jpath('items/item[ @index ]').should.equal('.items.item[ .index ]');
    });
});

