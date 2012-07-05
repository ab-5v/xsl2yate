var should = require('should');
var tr = require('../').transform;
var bea = require('../lib/bea');

describe('bea', function() {

    it('%i18n_Setup_Filters_header_1;', function() {
        tr('%i18n_Setup_Filters_header_1;').should.eql('i18n(\'%Setup_Filters_header_1\')');
    });
    it('%i18n_Setup_Filters_header_if(field, $cond, pattern);', function() {
        tr('%i18n_Setup_Filters_header_if(field, $cond, pattern);').should.eql('i18n(\'%Setup_Filters_header_if\', .field, cond, .pattern)');
    });
    it('if .some {.a}', function() {
        bea('    if .some {.a}').should.eql('    if .some {\n        .a\n    }');
    });
    it('if \\n else', function() {
        bea('}\n     else').should.eql('} else');
    });
});

