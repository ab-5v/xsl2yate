var should = require('should');
var jpath = require('../').jpath;


describe('jpath complex', function() {

    it('message | message-body', function() {
        jpath('message | message-body').should.equal('.message | .message-body');
    });
    it('/message | /message-body', function() {
        jpath('/message | /message-body').should.equal('/.message | /.message-body');
    });
    it('/*/message | /*/message-body', function() {
        jpath('/*/message | /*/message-body').should.equal('/.*.message | /.*.message-body');
    });
    it('count($folders/folder[@user]) > 1', function() {
        jpath('count($folders/folder[@user]) > 1').should.equal('count(folders.folder[.user]) > 1');
    });
});

