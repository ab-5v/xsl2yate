var should = require('should');
var tr = require('../').transform;
var bea = require('../');

describe('bea', function() {

    it('%i18n_Setup_Filters_header_1;', function() {
        tr('%i18n_Setup_Filters_header_1;').should.eql('{i18n(\'%Setup_Filters_header_1\')}');
    });
    it('%i18n_Setup_Filters_header_if(field, $cond, pattern);', function() {
        tr('%i18n_Setup_Filters_header_if(field, $cond, pattern);').should.eql('{i18n(\'%Setup_Filters_header_if\', .field, cond, .pattern)}');
    });
});

