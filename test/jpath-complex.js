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
    it('count($folders/folder[@user]) > 1', function() {
        jpath('count($folders/folder[@user]) > 1').should.equal('count(folders.folder[.user]) > 1');
    });
    it('i18n(\'%Folders_Unread\', new)', function() {
        jpath('i18n(\'%Folders_Unread\', new)').should.equal('i18n(\'%Folders_Unread\', .new)')
    });
    it('string-length(new)', function() {
        jpath('string-length(new)').should.equal('string-length(.new)')
    });
    it('folder[symbol=\'inbox\']', function() {
        jpath('folder[symbol=\'inbox\']').should.equal('.folder[.symbol==\'inbox\']');
    });
});

