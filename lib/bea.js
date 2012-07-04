//%i18n_Setup_Filters_header_if(field, $cond, pattern);

var XPath = require('./xpath');

var beas = {
    'i18n': {
        re: /%i18n_([a-zA-Z0-9_]+)\(?([^)]*)\)?;/,
        func: function(self, key, args) {
            var result = '{i18n(' + '\'%' + key + '\'';
            args = XPath.attrs(args).map(function(a, i) { return XPath.token(a, a); }).join(', ');
            result += ( args ? ', ' + args : '' ) + ')}';
            return result;
        }
    }
}
module.exports = function(result) {
    for (var key in beas) {
        result = result.replace(beas[key].re, beas[key].func);
    }
    return result;
};
