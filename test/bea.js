var should = require('should');
var compare = require('./util/compare');
var tr = require('../').transform;
var bea = require('../lib/bea');

describe('bea', function() {

    it('%i18n_Setup_Filters_header_1;', function() {
        tr('%i18n_Setup_Filters_header_1;').should.eql('i18n(\'%Setup_Filters_header_1\')');
    });

    it('%i18n_Setup_Filters_header_if(field, $cond, pattern);', function() {
        tr('%i18n_Setup_Filters_header_if(field, $cond, pattern);').should.eql('i18n(\'%Setup_Filters_header_if\', .field, cond, .pattern)');
    });

    it('%i18n_Еще_N_писем($settings/messages_per_page);', function() {
        tr('%i18n_Еще_N_писем($settings/messages_per_page);').should.eql('i18n(\'%Еще_N_писем\', settings.messages_per_page)');
    });

    it('>%i18n_Messages_Архив_писем;<', function() {
        tr('<div class="b-mail-pager__label">%i18n_Messages_Архив_писем;</div>')
            .should.eql('<div class="b-mail-pager__label">{i18n(\'%Messages_Архив_писем\')}</div>');
    });

    it('if .some {.a}', function() {
        bea('    if .some {.a}').should.eql('    if .some {\n        .a\n    }');
    });

    it('if \\n else', function() {
        bea('}\n     else').should.eql('} else');
    });

    it('complex', function(done) {
        compare('complex-bea', function(err, src, res) {
            should.not.exist(err);
            src.should.equal(res);
            done();
        });
    });
});

