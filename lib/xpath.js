
var reToken = /(['a-zA-Z0-9/$@.*_:-]+)(?![a-z\s]*\()/g;
var reOperator = /\s(div|mod|or|and|&lt;=|&gt;=|&gt;|&lt;|!=|=)\s/g;
var reFunc = /([a-z]+)\(([^)]*)\)/g

var XPath = {
    /**
     * Split xpath to xpath tokens
     * @param {String}
     * @type String
     */
    replace: function(xpath) {
        xpath = xpath.replace(reFunc, XPath.func);
        xpath = xpath.replace(reOperator, XPath.operator);
        xpath = xpath.replace(reToken, XPath.token);
        return xpath;
    },

    attrs: function(attrs) {
        var result = [];
        if (attrs) {
            return attrs.split(',').map(function(arg) { return arg.trim(); });
        }

        return result;
    },

    /**
     * Replaces functions
     * @param {String} self
     * @param {String} name
     * @param {String} attrs
     */
    func: function(self, name, attrs) {
        attrs = XPath.attrs(attrs);

        if (name in XPath.funcs) {
            return XPath.funcs[name](attrs);
        } else {
            return name + '(' + attrs.join(', ') + ')';
        }
    },

    funcs: {
        'not': function(attrs) {
            return '!(' + attrs.join(',') + ')';
        },
        'key': function(attrs) {
            return attrs.shift().replace(/^'|'$/g, '') + '(' + attrs.shift() + ')';
        }
    },

    /**
     * Converts xpath operator to jpath operator
     * @param {String} self
     * @param {String} operator
     */
    operator: function(self, operator) {
        if (operator in XPath.operators) {
            return XPath.operators[operator];
        } else {
            return operator;
        }
    },

    operators: {
        'div': ' / ',
        'mod': ' % ',
        'or': ' || ',
        'and': ' && ',
        '&lt;=': ' <= ',
        '&gt;=': ' >= ',
        '&lt;': ' < ',
        '&gt;': ' > ',
        '=': ' == ',
        '!=': ' != '
    },

    /**
     * Converts xpath tokens to to jpath
     * @param {String} self
     * @param {String} token
     * @type String
     */
    token: function(self, token) {
        var result = '';

        if (!token) {
            return result;
        }

        if (/^'[^']*'$/.test(token)) {
            return token;
        }

        if (/^\d+$/.test(token)) {
            return token;
        }

        if (/^(?:\/|\.|\.\.)$/.test(token)) {
            return token;
        }

        token = token.replace(/@/g, '');

        var char0 = token.charAt(0);

        if (char0 === '/') {
            result += '/';
            token = token.substr(1);
        }

        token = token.replace(/\.\.\//g, '.');

        result += token.split('/').map(function(s, i) {
            var result = '';
            if (i === 0 && char0 === '$') {
                return s.substr(1);
            } else {
                return /^[\.]+$/.test(s) ? s : '.' + s;
            }
        }).join('');

        return result;
    }
};

module.exports = XPath;
