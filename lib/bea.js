//%i18n_Setup_Filters_header_if(field, $cond, pattern);

var XPath = require('./xpath');

var beas = {
    'i18n': {
        re: /(>?)%i18n_([^;(]+)\(?([^)]*)\)?;(<?)/g,
        func: function(self, larr, key, args, rarr) {
            var result = '';
            if (larr && rarr) {
                result += '>{';
            }

            result += 'i18n(' + '\'%' + key + '\'';
            args = XPath.attrs(args).map(function(a, i) { return XPath.token(a, a); }).join(', ');
            result += ( args ? ', ' + args : '' ) + ')';

            if (larr && rarr) {
                result += '}<';
            }
            return result;
        }
    },
    'if': {
        re: /(\s*)if\s+([^{]+)\{([^}\n]+)\}/g,
        func: function(self, ind, cond, body) {
            return ind + 'if ' + cond.trim() + ' {\n' + ind + ind + body.trim() + '\n' + ind + '}';
        }
    },
    'ifelse': {
        re: /\}[\n\s]+else/g,
        func: function() {
            return '} else';
        }
    },
    'with-params-comma': {
        re: /,[\s\n]*\)/g,
        func: function() {
            return ')';
        }
    },
    'var in tag': {
        re: />(\.[a-z_-]+)</g,
        func: function(self, node) {
            return '>{' + node + '}<';
        }
    },
    merge: {
        re: /(\n\s+)\"([^"]+)\"\1(\.[^\n]+)\n/g,
        func: function(self, ind, str, j) {
            return ind + '"' + str + '{' + j + '}"\n';
        }
    }
}
module.exports = function(result) {
    for (var key in beas) {
        result = result.replace(beas[key].re, beas[key].func);
    }
    return result;
};
