var should = require('should');
var attrs = require('../lib/xsl').attrs;


describe('xsl-attrs', function() {

    it('name="value"', function() {
        attrs('name="value"').should.eql({name: 'value'});
    });
    it('name1="value" name2="value"', function() {
        attrs('name1="value" name2="value"').should.eql({name1: 'value', name2: 'value'});
    });
    it('name1="value[a and b]"', function() {
        attrs('name1="value[a and b]"').should.eql({name1: 'value[a and b]'});
    });
    it('name="emails" match="/*/emails/email" use="concat(login, \'@\', domain)"', function() {
        attrs('name1="emails" name2="/*/emails/email" name3="concat(login, \'@\', domain)"')
            .should.eql({name1: 'emails', name2: '/*/emails/email', name3: 'concat(login, \'@\', domain)'});
    });
});

